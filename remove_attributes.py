import json

def remove_attributes(data, attributes_to_remove):
    if isinstance(data, dict):
        return {key: remove_attributes(value, attributes_to_remove)
                for key, value in data.items() if key not in attributes_to_remove}
    elif isinstance(data, list):
        return [remove_attributes(item, attributes_to_remove) for item in data]
    return data

# Load JSON data
with open('public/creature.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Attributes to remove
attributes_to_remove = ["ac_scale","ac_scale_number",
                        "attack_bonus_scale","attack_bonus_scale_number"
                        "charisma_scale","charisma_scale_number",
                        "constitution_scale", "constitution_scale_number",
                        "creature_family",
                        "dexterity_scale", "dexterity_scale_number",
                        "exclude_from_search",
                        "fortitude_save_scale","fortitude_save_scale_number",
                        "hp_raw","hp_scale", "hp_scale_number",
                        "immunity",
                        "intelligence_scale", "intelligence_scale_number",
                        "markdown",
                        "language",
                        "perception_scale", "perception_scale_number",
                        "pfs",
                        "reflex_save_scale","reflex_save_scale_number",
                        "release_date",
                        "resistance_raw",
                        "source", "source_raw","source_category",
                        "sense",
                        "search_markdown",
                        "skill",
                        "skill_mod",
                        "speed_raw",
                        "strength_scale","strength_scale_number",
                        "spell",
                        "strike_damage_scale",
                        "spell_dc_scale", "spell_dc_scale_number",
                        "strongest_save",
                        "summary",
                        "tradition",
                        "trait","trait_group",
                        "trait_raw",
                        "weakest_save",
                        "will_save_scale","will_save_scale_number", "wisdom_scale", "wisdom_scale_number"
                        ]

# Remove attributes and save the result
cleaned_data = remove_attributes(data, attributes_to_remove)
with open('public/output.json', 'w') as f:
    json.dump(cleaned_data, f, indent=4)

print("Attributes removed and result saved to 'output.json'")
