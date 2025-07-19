import json
from .attributes_to_remove import attributes_to_remove
from .utils.extract_data import extract_abilities_from_markdown, extract_attacks
from .utils.filter_data import filter_reactions, filter_unique_abilities


def collect_legacy_ids(data):
    """Recursively collect all first 'legacy_id' values in the dataset."""
    legacy_ids = set()

    if isinstance(data, dict):
        if "legacy_id" in data:
            legacy_value = data["legacy_id"]
            if isinstance(legacy_value, list) and legacy_value:
                legacy_ids.add(legacy_value[0])  # take the first item
            elif isinstance(legacy_value, (str, int)):  # fallback if it's not a list
                legacy_ids.add(legacy_value)

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
            data["attacks"] = extract_attacks(data["markdown"])

            # If "creature_abilities" exists, extract reactions
            if "creature_ability" in data:
                data["unique_abilities"] = extract_abilities_from_markdown(
                    data["markdown"], data["creature_ability"]
                )
                data["reactions"] = filter_reactions(data["unique_abilities"])
                data["unique_abilities"] = filter_unique_abilities(
                    data["unique_abilities"]
                )

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


# Load JSON data
with open("public/creatures.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Collect all legacy IDs to be removed
ids_to_remove = collect_legacy_ids(data)

# Remove attributes and all entries where 'id' matches a collected legacy_id
cleaned_data = remove_attributes(data, attributes_to_remove, ids_to_remove)

# Save the cleaned data
with open("public/data/output.json", "w", encoding="utf-8") as f:
    json.dump(cleaned_data, f, indent=None)

print("Attributes removed and result saved to 'output.json'")
