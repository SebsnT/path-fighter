import re
from html import unescape


def extract_attacks(markdown):
    markdown = unescape(markdown)

    # Remove all \r and \n, replace with space
    markdown = markdown.replace("\r", " ").replace("\n", " ")

    markdown = re.sub(r"\[([^\]]+)\]\(/[^)]+\.aspx\?ID=\d+\)", r"\1", markdown)

    # Remove any [text](/Something.aspx?ID=digits) links
    markdown = re.sub(r"\s+", " ", markdown).strip()

    # Regex to extract bolded attack blocks from **Melee** or **Ranged** up to **Damage**
    attack_pattern = re.compile(
        r"\*\*(Melee|Ranged)\*\*.*?\*\*Damage\*\*.*?(?=\*\*|$)",  # non-greedy up to next bold or end
        flags=re.IGNORECASE,
    )

    attacks = []
    for match in attack_pattern.finditer(markdown):
        attack_text = match.group(0)

        # Remove bold markdown **...**
        attack_text = re.sub(r"\*\*", "", attack_text)

        # Replace <actions string="Single Action" /> with "Single Action"
        attack_text = re.sub(r'<actions string="([^"]+)" ?\/>', r"\1", attack_text)

        # Remove any other XML tags just in case
        attack_text = re.sub(r"<[^>]+>", "", attack_text)

        # Clean up multiple spaces again
        attack_text = re.sub(r"\s+", " ", attack_text).strip()

        attacks.append(attack_text)

    return attacks


def extract_abilities_from_markdown(markdown: str, abilities: list[str]):
    markdown = unescape(markdown)
    markdown = re.sub(r"<br(\s+)?\/?>", " ", markdown)
    markdown = re.sub(r"\[([^\]]+)\]\(/[^)]+\.aspx\?ID=\d+\)", r"\1", markdown)
    markdown = re.sub(r"\s+", " ", markdown)
    markdown = re.sub(r"_(.*?)_", r"\1", markdown)

    # Escape ability names
    abilities_esc = [re.escape(a) for a in abilities]
    ability_pattern = "|".join(abilities_esc)

    # Match either **Ability** or **[Ability](/...)**
    name_capture = rf"\*\*(?:\[)?({ability_pattern})(?:\])?\*\*"

    # Lookahead stops at the next bolded ability name or structural marker
    lookahead = (
        rf"(?=(?:\*\*(?:\[)?(?:{ability_pattern})(?:\])?\*\*"
        r"|</column>|</aside>|</row>|---|<title|<table|$))"
    )

    pattern = re.compile(
        rf"{name_capture}"  # Ability name
        r"(?:\s*<actions string=\"(.*?)\" />)?"  # Optional action
        r"\s*(.*?)" + lookahead,  # Description
        re.DOTALL,
    )

    results = []
    for match in pattern.finditer(markdown):
        name = match.group(1).strip()
        action = match.group(2) or ""
        desc = match.group(3).strip().rstrip("<")
        results.append({"name": name, "action": action, "description": desc})

    return results
