def filter_reactions(markdown: list[dict]) -> list[dict]:
    return list(filter(isReaction, markdown))

def filter_unique_abilities(markdown: list[dict]) -> list[dict]:
    return list(filter(lambda item: not isReaction(item), markdown))

def isReaction(ability: dict) -> bool:
    return "Reaction" in ability['action']
