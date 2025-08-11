import unittest

from scripts.utils.extract_data import extract_abilities_from_markdown, extract_attacks


class TestExtractAttacksFunction(unittest.TestCase):
    def test_extract_attacks_complex_1(self):
        text = '**Critical Failure** As failure, but frightened 2.<br />**Elegy of the Faithless** <actions string="Reaction" /> ([abjuration](/Traits.aspx?ID=2), [divine](/Traits.aspx?ID=48), [mental](/Traits.aspx?ID=106)) **Trigger** A [divine](/Traits.aspx?ID=48) spell is cast within 30 feet of the abandoned zealot; **Effect** The abandoned zealot howls an elegy of regret, forcing the spellcaster to attempt a DC 22 Will save, or DC 24 if the caster is a member of the zealot\'s former faith. On a failure, the elegy disrupts the spell.\r\n\r\n</column>\r\n\r\n---\r\n\r\n<column gap="tiny">\r\n\r\n**Speed** fly 40 feet\r\n\r\n**Melee**\r\n<actions string="Single Action" />\r\nhand of despair +16 ([Finesse](/Traits.aspx?ID=179), [Magical](/Traits.aspx?ID=103)),\r\n**Damage** 2d10+4 negative plus rend faith\r\n\r\n**Divine Innate Spells** DC 24\r\n- **4th**\r\n[Crisis of Faith](/Spells.aspx?ID=55)\r\n- **6th**\r\n[Zealous Conviction](/Spells.aspx?ID=378) (self only)\r\n\r\n**Rend Faith**   When hit by an abandoned zealot\'s hand of despair, a creature capable of [divine](/Traits.aspx?ID=48) spellcasting or with divinely granted abilities must succeed at a DC 24 Will save or be unable to use those spells or abilities until the end of its next turn.\r\n\r\n</column>\r\n\r\n<aside>\r\n<title level="2" noclass="true" icon="/images/Icons/Sidebar_4_RelatedCreatures.png">Liturgies of the Lost</title>\r\n\r\nA particular form of abandoned zealot appears near the Starstone Cathedral in the city of Absalom. Mortals who fail to reach divinity through the Test of the _Starstone_ perish and arise as these wrathful undead, despising other aspirants.\r\n</aside>'
        result = extract_attacks(text)
        self.assertEqual(
            result,
            [
                "Melee Single Action hand of despair +16 (Finesse, Magical), Damage 2d10+4 negative plus rend faith"
            ],
        )


class TestExtractAbilitiesFunction(unittest.TestCase):
    def test_extract_abilities_basic(self):
        markdown = '**Ferocity** <actions string="Action" /> When reduced to 0 HP, make a Fortitude save.'
        result = extract_abilities_from_markdown(markdown, ["Ferocity"])
        self.assertEqual(
            result,
            [
                {
                    "name": "Ferocity",
                    "action": "Action",
                    "description": "When reduced to 0 HP, make a Fortitude save.",
                }
            ],
        )

    def test_extract_abilities_multiple(self):
        markdown = """
        **Ferocity** <actions string="Reaction" /> Revives at 1 HP.
        **Regeneration** <actions string="Action" /> Recovers 5 HP each round.
        """
        result = extract_abilities_from_markdown(markdown, ["Ferocity", "Regeneration"])
        self.assertEqual(
            result,
            [
                {
                    "name": "Ferocity",
                    "action": "Reaction",
                    "description": "Revives at 1 HP.",
                },
                {
                    "name": "Regeneration",
                    "action": "Action",
                    "description": "Recovers 5 HP each round.",
                },
            ],
        )

    def test_extract_abilities_link_removal(self):
        markdown = "**Poison** Deals [1d6 damage](/SomePage.aspx?ID=123) every turn."
        result = extract_abilities_from_markdown(markdown, ["Poison"])
        self.assertEqual(
            result,
            [
                {
                    "name": "Poison",
                    "action": "",
                    "description": "Deals 1d6 damage every turn.",
                }
            ],
        )

    def test_extract_abilities_stop_at_delimiters(self):
        markdown = """
        **Smash** <actions string=\"Reaction\" /> Destroys obstacles.
        ---
        **Crash** <actions string=\"Single Action\" /> Collides into enemies.
        """
        result = extract_abilities_from_markdown(markdown, ["Smash", "Crash"])
        self.assertEqual(
            result,
            [
                {
                    "name": "Smash",
                    "action": "Reaction",
                    "description": "Destroys obstacles.",
                },
                {
                    "name": "Crash",
                    "action": "Single Action",
                    "description": "Collides into enemies.",
                },
            ],
        )

    def test_extract_abilities_complex_1(self):
        markdown = '\n\n**Chipping Scales** <actions string="Reaction" /> **Frequency** once per day; **Trigger** The granitescale is about to take piercing or slashing damage; **Effect** The granitescale twists to take the blow on their hardest scales, which they shed to reduce the incoming force. The granitescale gains resistance 15 to the damage, but their AC is reduced by 2 for 1 day, when the shed scales regrow.<br />**[Reactive Strike](/MonsterAbilities.aspx?ID=48)** <actions string="Reaction" /> \r\n\r\n</column>\r\n\r\n---\r\n\r\n<column gap="tiny">\r\n\r\n**Speed** 25 feet\r\n\r\n**Melee**\r\n<actions string="Single Action" />\r\nlongspear +17 ([reach 10 feet](/Traits.aspx?ID=192)),\r\n**Damage** 1d8+11 piercing\r\n\r\n**Melee**\r\n<actions string="Single Action" />\r\nfangs +17,\r\n**Damage** 1d8+11 piercing plus serpentfolk venom\r\n\r\n**Ranged**\r\n<actions string="Single Action" />\r\njavelin +16 ([range increment 30 feet](/Traits.aspx?ID=248)),\r\n**Damage** 1d6+11 piercing\n\n**Rattling Spear** <actions string="Single Action" /> ([Auditory](/Traits.aspx?ID=16), [Emotion](/Traits.aspx?ID=60), [Mental](/Traits.aspx?ID=106)) **Requirements** The granitescale\'s last action was a successful longspear Strike; **Effect** The granitescale rattles the base of their spear, attempting an [Intimidation](/Skills.aspx?ID=40) check to [Demoralize](/Actions.aspx?ID=2395) all enemies within 30 feet (compare the check result to the targets\' Will DCs individually).\r\n\r\n**Serpentfolk Venom**  ([Poison](/Traits.aspx?ID=126)) **Saving Throw** DC 22 Fortitude; **Maximum Duration** 6 rounds; **Stage 1** 1d4 poison damage and [enfeebled 1](/Conditions.aspx?ID=71) (1 round); **Stage 2** 2d4 poison damage and enfeebled 1 (1 round)\r\n\r\n</column>\n\n<document level="2" id="creature-family-468" />'
        result = extract_abilities_from_markdown(
            markdown,
            [
                "Chipping Scales",
                "Reactive Strike",
                "Rattling Spear",
                "Serpentfolk Venom",
            ],
        )
        self.assertEqual(
            result,
            [
                {
                    "name": "Chipping Scales",
                    "action": "Reaction",
                    "description": "**Frequency** once per day; **Trigger** The granitescale is about to take piercing or slashing damage; **Effect** The granitescale twists to take the blow on their hardest scales, which they shed to reduce the incoming force. The granitescale gains resistance 15 to the damage, but their AC is reduced by 2 for 1 day, when the shed scales regrow.",
                },
                {"name": "Reactive Strike", "action": "Reaction", "description": ""},
                {
                    "name": "Rattling Spear",
                    "action": "Single Action",
                    "description": "(Auditory, Emotion, Mental) **Requirements** The granitescale's last action was a successful longspear Strike; **Effect** The granitescale rattles the base of their spear, attempting an Intimidation check to Demoralize all enemies within 30 feet (compare the check result to the targets' Will DCs individually).",
                },
                {
                    "name": "Serpentfolk Venom",
                    "action": "",
                    "description": "(Poison) **Saving Throw** DC 22 Fortitude; **Maximum Duration** 6 rounds; **Stage 1** 1d4 poison damage and enfeebled 1 (1 round); **Stage 2** 2d4 poison damage and enfeebled 1 (1 round)",
                },
            ],
        )

    def test_extract_abilities_terrasque(self):
        markdown = '**Resistances**\r\nfire 25, physical 25\n\n**Carapace** Tarrasque is immune to cones, lines, rays, and [_magic missile_](/Spells.aspx?ID=180) spells. These effects bounce harmlessly off its scales.<br /> **Frightful Presence** ([aura](/Traits.aspx?ID=206), [emotion](/Traits.aspx?ID=60), [fear](/Traits.aspx?ID=68), [mental](/Traits.aspx?ID=106)) 300 feet, DC 39<br /> **Inexorable** Tarrasque recovers from the [slowed](/Conditions.aspx?ID=35) and [stunned](/Conditions.aspx?ID=36) conditions at the end of its turn. It’s also immune to penalties to its Speeds, and it ignores difficult terrain and greater difficult terrain.<br /> **Reactive** Tarrasque gains 3 reactions each round. It can still use only one reaction per trigger.<br /> **Attack of Opportunity** <actions string="Reaction" /><br /> **Reflect** <actions string="Reaction" /> **Trigger** Tarrasque’s carapace deflects an effect. **Effect** The effect is redirected back at its source.\r\n\r\n</column>\r\n\r\n---\r\n\r\n<column gap="tiny">\r\n\r\n**Speed** 50 feet, swim 50 feet\r\n\r\n**Melee**\r\n<actions string="Single Action" />\r\njaws +45 ([Chaotic](/Traits.aspx?ID=25), [Evil](/Traits.aspx?ID=64), [Magical](/Traits.aspx?ID=103), [reach 20 feet](/Traits.aspx?ID=192)),\r\n**Damage** 5d12+20 piercing plus Improved Grab\r\n\r\n**Melee**\r\n<actions string="Single Action" />\r\nclaw +45 ([Agile](/Traits.aspx?ID=170), [Chaotic](/Traits.aspx?ID=25), [Evil](/Traits.aspx?ID=64), [Magical](/Traits.aspx?ID=103), [reach 15 feet](/Traits.aspx?ID=192)),\r\n**Damage** 5d10+20 slashing\r\n\r\n**Melee**\r\n<actions string="Single Action" />\r\ntail +45 ([Chaotic](/Traits.aspx?ID=25), [Evil](/Traits.aspx?ID=64), [Magical](/Traits.aspx?ID=103), [reach 30 feet](/Traits.aspx?ID=192)),\r\n**Damage** 4d12+20 bludgeoning\r\n\r\n**Melee**\r\n<actions string="Single Action" />\r\nhorn +45 ([Chaotic](/Traits.aspx?ID=25), [Evil](/Traits.aspx?ID=64), [Magical](/Traits.aspx?ID=103), [reach 15 feet](/Traits.aspx?ID=192)),\r\n**Damage** 4d10+20 piercing\r\n\r\n**Ranged**\r\n<actions string="Single Action" />\r\nspine +45 ([Brutal](/Traits.aspx?ID=249), [Chaotic](/Traits.aspx?ID=25), [Evil](/Traits.aspx?ID=64), [Magical](/Traits.aspx?ID=103), [range increment 120 feet](/Traits.aspx?ID=248)),\r\n**Damage** 3d10+20 piercing\n\n**Destructive Frenzy** <actions string="Three Actions" />  Tarrasque makes a jaws Strike, two claw Strikes, two horn Strikes, and one tail Strike in any order.\r\n\r\n**Fast Swallow** <actions string="Reaction" />  **Trigger** Tarrasque Grabs a creature with its jaws; **Effect** Tarrasque uses Swallow Whole.\r\n\r\n**Spine Volley** <actions string="Two Actions" />  Tarrasque flings spines in a 120-foot cone, dealing 3d10+20 piercing damage to each creature in the area (DC 53 basic Reflex save). Tarrasque can’t use Spine Volley again for 1d4 rounds.\r\n\r\n**[Swallow Whole](/MonsterAbilities.aspx?ID=35)** <actions string="Single Action" /> ([Attack](/Traits.aspx?ID=15)) Huge, 10d6+12 bludgeoning plus 10d6 acid, Rupture 50\r\n\r\n**[Trample](/MonsterAbilities.aspx?ID=39)** <actions string="Three Actions" />  Huge or smaller, claw, DC 49. When Tarrasque Tramples, it can Stride up to triple its Speed.\r\n\r\n</column>\n\n<document level="2" id="creature-family-115" />'
        result = extract_abilities_from_markdown(
            markdown,
            [
                "Carapace",
                "Frightful Presence",
                "Inexorable",
                "Reactive",
                "Attack of Opportunity",
                "Reflect",
                "Destructive Frenzy",
                "Fast Swallow",
                "Spine Volley",
                "Swallow Whole",
                "Trample",
            ],
        )
        self.assertEqual(
            result,
            [
                {
                    "name": "Carapace",
                    "action": "",
                    "description": "Tarrasque is immune to cones, lines, rays, and magic missile spells. These effects bounce harmlessly off its scales.",
                },
                {
                    "name": "Frightful Presence",
                    "action": "",
                    "description": "(aura, emotion, fear, mental) 300 feet, DC 39",
                },
                {
                    "name": "Inexorable",
                    "action": "",
                    "description": "Tarrasque recovers from the slowed and stunned conditions at the end of its turn. It’s also immune to penalties to its Speeds, and it ignores difficult terrain and greater difficult terrain.",
                },
                {
                    "name": "Reactive",
                    "action": "",
                    "description": "Tarrasque gains 3 reactions each round. It can still use only one reaction per trigger.",
                },
                {
                    "name": "Attack of Opportunity",
                    "action": "Reaction",
                    "description": "",
                },
                {
                    "name": "Reflect",
                    "action": "Reaction",
                    "description": "**Trigger** Tarrasque’s carapace deflects an effect. **Effect** The effect is redirected back at its source.",
                },
                {
                    "name": "Destructive Frenzy",
                    "action": "Three Actions",
                    "description": "Tarrasque makes a jaws Strike, two claw Strikes, two horn Strikes, and one tail Strike in any order.",
                },
                {
                    "name": "Fast Swallow",
                    "action": "Reaction",
                    "description": "**Trigger** Tarrasque Grabs a creature with its jaws; **Effect** Tarrasque uses Swallow Whole.",
                },
                {
                    "name": "Spine Volley",
                    "action": "Two Actions",
                    "description": "Tarrasque flings spines in a 120-foot cone, dealing 3d10+20 piercing damage to each creature in the area (DC 53 basic Reflex save). Tarrasque can’t use Spine Volley again for 1d4 rounds.",
                },
                {
                    "name": "Swallow Whole",
                    "action": "Single Action",
                    "description": "(Attack) Huge, 10d6+12 bludgeoning plus 10d6 acid, Rupture 50",
                },
                {
                    "name": "Trample",
                    "action": "Three Actions",
                    "description": "Huge or smaller, claw, DC 49. When Tarrasque Tramples, it can Stride up to triple its Speed.",
                },
            ],
        )
    def test_extract_abilities_bullet_point_list(self):
        markdown = """
        **Swarm Tactics** <actions string="Free Action" /> The swarm coordinates its assault:
        <ul>
            <li>Each ally within 10 feet gains +1 to attack rolls</li>
            <li>Enemies must succeed at a DC 20 Will save or become frightened 1</li>
        </ul>
        """
        result = extract_abilities_from_markdown(markdown, ["Swarm Tactics"])
        self.assertEqual(
            result,
            [
                {
                    "name": "Swarm Tactics",
                    "action": "Free Action",
                    "description": "The swarm coordinates its assault: \u2022 Each ally within 10 feet gains +1 to attack rolls \u2022 Enemies must succeed at a DC 20 Will save or become frightened 1",
                }
            ],
        )
    def test_underline_removal(self):
        markdown = "**Poison** This ability causes _weakness_ to enemies."
        result = extract_abilities_from_markdown(markdown, ["Poison"])
        self.assertEqual(
            result,
            [
                {
                    "name": "Poison",
                    "action": "",
                    "description": "This ability causes weakness to enemies.",
                }
            ],
        )


if __name__ == "__main__":
    unittest.main()
