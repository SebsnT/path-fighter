import json
import re
from html import unescape
from attributes_to_remove import attributes_to_remove


def collect_legacy_ids(data):
    """Recursively collect all 'legacy_id' values in the dataset."""
    legacy_ids = set()

    if isinstance(data, dict):
        if "legacy_id" in data:
            legacy_ids.add(data["legacy_id"])
        for value in data.values():
            legacy_ids.update(collect_legacy_ids(value))

    elif isinstance(data, list):
        for item in data:
            legacy_ids.update(collect_legacy_ids(item))

    return legacy_ids


def remove_attributes(data, attributes_to_remove, ids_to_remove):
    """Recursively remove attributes and dictionaries where
    'id' matches 'legacy_id' values to remove."""
    if isinstance(data, dict):
        # If the dictionary has an 'id' and
        # it matches one of the collected legacy_ids, remove it
        if "id" in data and data["id"] in ids_to_remove:
            return None

        # If "text" exists, extract attacks
        if "text" in data:
            data["attacks"] = extract_attacks(data["text"])

            # If "creature_abilities" exists, extract reactions
            if "creature_ability" in data:
              data["unique_abilities"] = extract_abilities_from_markdown(data["markdown"], data['creature_ability'])

        return {
            key: remove_attributes(value, attributes_to_remove, ids_to_remove)
            for key, value in data.items()
            if key not in attributes_to_remove
        }

    elif isinstance(data, list):
        # Process each item and filter out None values
        cleaned_items = [
            remove_attributes(item, attributes_to_remove, ids_to_remove)
            for item in data
        ]
        return [item for item in cleaned_items if item is not None]

    return data


def extract_attacks(text):
    text = re.sub(r"\s+", " ", text.strip())

    # Improved pattern: match only up to end of single attack line
    weapon_attack_pattern = re.compile(
        r"(Melee|Ranged)\s+\w+(?:\s+\w+)*\s+Action.+?,\s*Damage\s+\d+[dD]\d+(?:\+\d+)?\s+[a-zA-Z]+(?:\s+plus\s+\d+[dD]\d+(?:\+\d+)?\s+[a-zA-Z]+)?",
        flags=re.IGNORECASE,
    )

    results = []

    for match in weapon_attack_pattern.finditer(text):
        attack = match.group(0).strip()
        if "plus" in attack:
            # Check if 'plus' is followed by another damage dice
            # if not, tag it
            if not re.search(r"plus\s+\d+[dD]\d+(?:\+\d+)?\s+[a-zA-Z]+", attack):
                attack += " (see Creature)"
        results.append(attack)

    return results


def extract_abilities_from_markdown(markdown: str, abilities: list[str]):
    markdown = re.sub(r"\s+", " ", unescape(markdown))

    # Escape ability names
    abilities_esc = [re.escape(a) for a in abilities]

    pattern = re.compile(
        rf"\*\*({'|'.join(abilities_esc)})\*\*"             # Match ability name
        r"(?:\s*<actions string=\"(.*?)\" />)?"              # Optional action tag
        r"\s*(.*?)"                                          # Description
        r"(?=(?:\*\*[A-Z][^*]+\*\* <actions|</column>|</aside>|</row>|---|<title|<table|$))",
        re.DOTALL
    )

    results = []
    for match in pattern.finditer(markdown):
        name = match.group(1).strip()
        action = match.group(2) or ""
        desc = match.group(3).strip().rstrip('<')  # Strip off trailing artifacts
        results.append({
            "name": name,
            "action": action,
            "description": desc
        })

    return results


# Load JSON data
with open("public/creatures.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Collect all legacy IDs to be removed
ids_to_remove = collect_legacy_ids(data)

# Remove attributes and all entries where 'id' matches a collected legacy_id
cleaned_data = remove_attributes(data, attributes_to_remove, ids_to_remove)

# Save the cleaned data
with open("public/output.json", "w", encoding="utf-8") as f:
    json.dump(cleaned_data, f, indent=None)

print("Attributes removed and result saved to 'output.json'")
