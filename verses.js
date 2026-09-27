// Verse data — King James Version (public domain text).
// Wording checked against a live KJV source where possible; the rest are
// drawn from verses reproduced consistently and verbatim across KJV texts.
(function () {
  "use strict";

  var CATEGORIES = [
    {
      id: "anxious",
      label: "anxious",
      keywords: /\b(anxious|anxiety|worr(y|ied|ying)|nervous|scared|afraid|fear(ful)?|panic|stress(ed)?)\b/i,
      verses: [
        { ref: "Philippians 4:6-7", text: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus." },
        { ref: "Isaiah 41:10", text: "Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness." },
        { ref: "Matthew 6:34", text: "Take therefore no thought for the morrow: for the morrow shall take thought for the things of itself. Sufficient unto the day is the evil thereof." },
        { ref: "1 Peter 5:7", text: "Casting all your care upon him; for he careth for you." },
        { ref: "Psalm 56:3", text: "What time I am afraid, I will trust in thee." }
      ]
    },
    {
      id: "sad",
      label: "sad",
      keywords: /\b(sad|down|depress(ed|ing)?|heartbrok(en)?|hurting|crying|blue|low)\b/i,
      verses: [
        { ref: "Psalm 34:18", text: "The Lord is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit." },
        { ref: "Psalm 147:3", text: "He healeth the broken in heart, and bindeth up their wounds." },
        { ref: "Matthew 5:4", text: "Blessed are they that mourn: for they shall be comforted." },
        { ref: "Psalm 30:5", text: "For his anger endureth but a moment; in his favour is life: weeping may endure for a night, but joy cometh in the morning." },
        { ref: "Psalm 42:11", text: "Why art thou cast down, O my soul? and why art thou disquieted within me? hope thou in God: for I shall yet praise him, who is the health of my countenance, and my God." }
      ]
    },
    {
      id: "angry",
      label: "angry",
      keywords: /\b(angry|anger|mad|furious|frustrat(ed|ing)?|irritat(ed|ing)?|rage)\b/i,
      verses: [
        { ref: "Ephesians 4:26-27", text: "Be ye angry, and sin not: let not the sun go down upon your wrath: Neither give place to the devil." },
        { ref: "James 1:19-20", text: "Wherefore, my beloved brethren, let every man be swift to hear, slow to speak, slow to wrath: For the wrath of man worketh not the righteousness of God." },
        { ref: "Proverbs 15:1", text: "A soft answer turneth away wrath: but grievous words stir up anger." },
        { ref: "Psalm 37:8", text: "Cease from anger, and forsake wrath: fret not thyself in any wise to do evil." },
        { ref: "Proverbs 29:11", text: "A fool uttereth all his mind: but a wise man keepeth it in till afterwards." }
      ]
    },
    {
      id: "lonely",
      label: "lonely",
      keywords: /\b(lonely|alone|isolat(ed|ion)|abandon(ed)?|forgotten|left out|nobody)\b/i,
      verses: [
        { ref: "Deuteronomy 31:6", text: "Be strong and of a good courage, fear not, nor be afraid of them: for the Lord thy God, he it is that doth go with thee; he will not fail thee, nor forsake thee." },
        { ref: "Psalm 68:6", text: "God setteth the solitary in families: he bringeth out those which are bound with chains: but the rebellious dwell in a dry land." },
        { ref: "Hebrews 13:5", text: "Let your conversation be without covetousness; and be content with such things as ye have: for he hath said, I will never leave thee, nor forsake thee." },
        { ref: "Matthew 28:20", text: "Teaching them to observe all things whatsoever I have commanded you: and, lo, I am with you alway, even unto the end of the world. Amen." },
        { ref: "Psalm 25:16", text: "Turn thee unto me, and have mercy upon me; for I am desolate and afflicted." }
      ]
    },
    {
      id: "guilty",
      label: "guilty",
      keywords: /\b(guilty|guilt|ashamed|shame|regret|screwed up|messed up)\b/i,
      verses: [
        { ref: "1 John 1:9", text: "If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness." },
        { ref: "Psalm 103:12", text: "As far as the east is from the west, so far hath he removed our transgressions from us." },
        { ref: "Romans 8:1", text: "There is therefore now no condemnation to them which are in Christ Jesus, who walk not after the flesh, but after the Spirit." },
        { ref: "Isaiah 1:18", text: "Come now, and let us reason together, saith the Lord: though your sins be as scarlet, they shall be as white as snow; though they be red like crimson, they shall be as wool." },
        { ref: "Psalm 51:10", text: "Create in me a clean heart, O God; and renew a right spirit within me." }
      ]
    },
    {
      id: "tired",
      label: "tired",
      keywords: /\b(tired|exhaust(ed|ion)?|weary|burn(ed|t)? ?out|drained|worn out|no energy)\b/i,
      verses: [
        { ref: "Matthew 11:28-30", text: "Come unto me, all ye that labour and are heavy laden, and I will give you rest. Take my yoke upon you, and learn of me; for I am meek and lowly in heart: and ye shall find rest unto your souls. For my yoke is easy, and my burden is light." },
        { ref: "Isaiah 40:29,31", text: "He giveth power to the faint; and to them that have no might he increaseth strength. ... But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint." },
        { ref: "Galatians 6:9", text: "And let us not be weary in well doing: for in due season we shall reap, if we faint not." },
        { ref: "Psalm 62:1", text: "Truly my soul waiteth upon God: from him cometh my salvation." },
        { ref: "2 Corinthians 4:16", text: "For which cause we faint not; but though our outward man perish, yet the inward man is renewed day by day." }
      ]
    },
    {
      id: "hopeless",
      label: "hopeless",
      keywords: /\b(hopeless|giving up|give up|discourag(ed|ing)?|defeated|can'?t go on|pointless|no point)\b/i,
      verses: [
        { ref: "Jeremiah 29:11", text: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end." },
        { ref: "Romans 15:13", text: "Now the God of hope fill you with all joy and peace in believing, that ye may abound in hope, through the power of the Holy Ghost." },
        { ref: "Psalm 42:5", text: "Why art thou cast down, O my soul? and why art thou disquieted in me? hope thou in God: for I shall yet praise him for the help of his countenance." },
        { ref: "Lamentations 3:22-23", text: "It is of the LORD's mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness." },
        { ref: "Psalm 27:13-14", text: "I had fainted, unless I had believed to see the goodness of the LORD in the land of the living. Wait on the LORD: be of good courage, and he shall strengthen thine heart: wait, I say, on the LORD." }
      ]
    },
    {
      id: "uncertain",
      label: "uncertain",
      keywords: /\b(confus(ed|ing)?|uncertain|doubt(ful)?|lost|don'?t know|unsure|which way|what to do)\b/i,
      verses: [
        { ref: "Proverbs 3:5-6", text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths." },
        { ref: "Joshua 1:9", text: "Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest." },
        { ref: "2 Timothy 1:7", text: "For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind." },
        { ref: "Psalm 32:8", text: "I will instruct thee and teach thee in the way which thou shalt go: I will guide thee with mine eye." },
        { ref: "Isaiah 26:3", text: "Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee." }
      ]
    },
    {
      id: "grateful",
      label: "grateful",
      keywords: /\b(grateful|thankful|thanks|blessed|happy|joyful|joy|excited|good|great)\b/i,
      verses: [
        { ref: "Psalm 100:4-5", text: "Enter into his gates with thanksgiving, and into his courts with praise: be thankful unto him, and bless his name. For the LORD is good; his mercy is everlasting; and his truth endureth to all generations." },
        { ref: "1 Thessalonians 5:16-18", text: "Rejoice evermore. Pray without ceasing. In every thing give thanks: for this is the will of God in Christ Jesus concerning you." },
        { ref: "Psalm 118:24", text: "This is the day which the LORD hath made; we will rejoice and be glad in it." },
        { ref: "Philippians 4:4", text: "Rejoice in the Lord alway: and again I say, Rejoice." },
        { ref: "Psalm 103:1-2", text: "Bless the LORD, O my soul: and all that is within me, bless his holy name. Bless the LORD, O my soul, and forget not all his benefits:" }
      ]
    },
    {
      id: "tempted",
      label: "tempted",
      keywords: /\b(tempt(ed|ation)?|struggl(e|ing)|addict(ed|ion)?|relapse|urge|can'?t stop)\b/i,
      verses: [
        { ref: "1 Corinthians 10:13", text: "There hath no temptation taken you but such as is common to man: but God is faithful, who will not suffer you to be tempted above that ye are able; but will with the temptation also make a way to escape, that ye may be able to bear it." },
        { ref: "James 4:7", text: "Submit yourselves therefore to God. Resist the devil, and he will flee from you." },
        { ref: "Hebrews 4:15-16", text: "For we have not an high priest which cannot be touched with the feeling of our infirmities; but was in all points tempted like as we are, yet without sin. Let us therefore come boldly unto the throne of grace, that we may obtain mercy, and find grace to help in time of need." },
        { ref: "Matthew 26:41", text: "Watch and pray, that ye enter not into temptation: the spirit indeed is willing, but the flesh is weak." },
        { ref: "Galatians 5:16", text: "This I say then, Walk in the Spirit, and ye shall not fulfil the lust of the flesh." }
      ]
    },
    {
      id: "grieving",
      label: "grieving",
      keywords: /\b(grie(f|ving)|died|death|passed away|loss|lost my|funeral|miss (him|her|them))\b/i,
      verses: [
        { ref: "Psalm 23:4", text: "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me." },
        { ref: "John 11:25-26", text: "Jesus said unto her, I am the resurrection, and the life: he that believeth in me, though he were dead, yet shall he live: And whosoever liveth and believeth in me shall never die." },
        { ref: "2 Corinthians 1:3-4", text: "Blessed be God, even the Father of our Lord Jesus Christ, the Father of mercies, and the God of all comfort; Who comforteth us in all our tribulation, that we may be able to comfort them which are in any trouble, by the comfort wherewith we ourselves are comforted of God." },
        { ref: "Revelation 21:4", text: "And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away." },
        { ref: "1 Thessalonians 4:13-14", text: "But I would not have you to be ignorant, brethren, concerning them which are asleep, that ye sorrow not, even as others which have no hope. For if we believe that Jesus died and rose again, even so them also which sleep in Jesus will God bring with him." }
      ]
    },
    {
      id: "overwhelmed",
      label: "overwhelmed",
      keywords: /\b(overwhelm(ed|ing)?|too much|can'?t cope|breaking down|falling apart|weak)\b/i,
      verses: [
        { ref: "Philippians 4:13", text: "I can do all things through Christ which strengtheneth me." },
        { ref: "2 Corinthians 12:9", text: "And he said unto me, My grace is sufficient for thee: for my strength is made perfect in weakness. Most gladly therefore will I rather glory in my infirmities, that the power of Christ may rest upon me." },
        { ref: "Psalm 46:1", text: "God is our refuge and strength, a very present help in trouble." },
        { ref: "Nehemiah 8:10", text: "Then he said unto them, Go your way, eat the fat, and drink the sweet, and send portions unto them for whom nothing is prepared: for this day is holy unto our Lord: neither be ye sorry; for the joy of the LORD is your strength." },
        { ref: "Psalm 73:26", text: "My flesh and my heart faileth: but God is the strength of my heart, and my portion for ever." }
      ]
    },
    {
      id: "general",
      label: "just checking in",
      keywords: null,
      verses: [
        { ref: "Numbers 6:24-26", text: "The LORD bless thee, and keep thee: The LORD make his face shine upon thee, and be gracious unto thee: The LORD lift up his countenance upon thee, and give thee peace." },
        { ref: "Psalm 16:11", text: "Thou wilt shew me the path of life: in thy presence is fulness of joy; at thy right hand there are pleasures for evermore." },
        { ref: "Psalm 143:8", text: "Cause me to hear thy lovingkindness in the morning; for in thee do I trust: cause me to know the way wherein I should walk; for I lift up my soul unto thee." },
        { ref: "Jeremiah 17:7-8", text: "Blessed is the man that trusteth in the LORD, and whose hope the LORD is. For he shall be as a tree planted by the waters, and that spreadeth out her roots by the river, and shall not see when heat cometh, but her leaf shall be green; and shall not be careful in the year of drought, neither shall cease from yielding fruit." },
        { ref: "Psalm 37:4", text: "Delight thyself also in the LORD; and he shall give thee the desires of thine heart." }
      ]
    }
  ];

  window.VERSE_CATEGORIES = CATEGORIES;
})();
