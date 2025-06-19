import unittest
from scripts.utils.filter_data import filter_reactions, filter_unique_abilities, isReaction

reactionEntry = {
            "name": "Ferocity",
            "action": "Reaction",
            "description": "When reduced to 0 HP, make a Fortitude save."
            }

actionEntry = {
                "name": "Regeneration",
                "action": "Action",
                "description": "Recovers 5 HP each round."
            }

allEntries = [reactionEntry, actionEntry]

class TestFilterReactionFunction(unittest.TestCase):
  def test_isReachtion_true(self):
      result = isReaction(reactionEntry)
      self.assertEqual(result, True)

  def test_isReachtion_false(self):
      result = isReaction(reactionEntry)
      self.assertEqual(result, False)


class TestFilterReactionFunction(unittest.TestCase):
  def test_returnReactions(self):
      result = filter_reactions(allEntries)
      self.assertEqual(result,[reactionEntry])

class TestFilterUniqueAbilitiesFunction(unittest.TestCase):
  def test_returnUniqueAbilities(self):
      result = filter_unique_abilities(allEntries)
      self.assertEqual(result, [actionEntry])
