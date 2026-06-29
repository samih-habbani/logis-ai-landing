export type Lang = 'en' | 'ar'

export const t = {
  en: {
    dir: 'ltr' as const,
    lang: 'en',
    fontFamily: "'Exo 2', 'DM Sans', system-ui, sans-serif",

    // Nav / badge
    partnership: 'Dubai Customs × Logiscool',

    // Hero
    heroTitle1: 'GENERATIVE',
    heroTitle2: 'AI',
    heroSubtitle: 'Creative AI, Prompting & Multimedia Creation',
    heroAges: 'Adapted for ages 6–9, 10–12 and 12–14',
    registerNow: 'Register Now',
    explorePrograms: 'Explore Programs',

    // About
    aboutLabel: 'About The Program',
    aboutHeadline1: 'Hands-on AI for',
    aboutHeadline2: 'Future Creators',
    aboutBody: 'A hands-on camp where children explore how generative AI can create text, images, sounds, voices, and animated content. Through guided creative challenges, students learn how AI responds to prompts, how to improve results, and how to use these tools responsibly.',
    skills: [
      { icon: '✍️', label: 'Prompt Engineering' },
      { icon: '🖼️', label: 'AI Image Creation' },
      { icon: '🎵', label: 'Sound & Voice AI' },
      { icon: '🛡️', label: 'Responsible AI' },
    ],

    // Programs
    programsLabel: 'Three Programs',
    programsHeadline1: 'Choose Your',
    programsHeadline2: 'Level',
    agesLabel: 'Ages',
    whatTheyExplore: 'What They Explore',
    learningOutcome: 'Learning Outcome: ',

    // Register
    registerLabel: 'Secure Your Spot',
    registerHeadline1: 'Register',
    registerHeadline2: 'Today',
    registerSubtitle: 'Fill in the details below and our team will be in touch shortly.',

    // Form
    divParent: 'Parent / Guardian',
    divSeats: 'Workshop Seats',
    divChildren: (n: number) => `Children Details (${n} ${n > 1 ? 'children' : 'child'})`,
    fieldFullName: 'Full Name',
    fieldEmail: 'Email Address',
    fieldPhone: 'Phone Number',
    fieldArea: 'Area of Residence',
    fieldDOB: 'Date of Birth',
    fieldGrade: 'Grade',
    fieldSchool: 'School',
    placeholderName: 'Sarah Al Mansouri',
    placeholderEmail: 'sarah@email.com',
    placeholderPhone: '+971 50 000 0000',
    placeholderArea: 'Dubai Marina, JVC, Downtown…',
    placeholderChildName: 'Omar Al Mansouri',
    placeholderSchool: 'GEMS, DAIS, Repton…',
    selectGrade: 'Select grade…',
    seatsNote: (max: number) => `Select the number of seats per age group (max ${max} each) — you can book for multiple children`,
    noSeats: 'No seats',
    waitlistTitle: "You're registered!",
    waitlistBody: "Unfortunately seats are no longer available for your child's age group. Our team at Logiscool UAE will contact you to arrange a free trial session for our coding courses at any Logiscool center in the UAE.",
    seatsSelected: (n: number) => `${n} seat${n > 1 ? 's' : ''} selected`,
    maxSeats: (n: number) => `Maximum ${n} seats per group`,
    seatDisplay: (v: number, max: number) => `${v} / ${max} seat${v > 1 ? 's' : ''}`,
    childLabel: (i: number, total: number) => `Child ${i + 1}${total > 1 ? ' of ' + total : ''}`,
    submitBtn: (n: number) => `Register ${n} Seat${n > 1 ? 's' : ''} →`,
    submitIdle: 'Select seats to continue',
    submitting: 'Registering…',
    errorMinSeats: 'Please select at least one seat.',
    errorGeneric: 'Something went wrong.',
    consent: 'By registering, you agree to be contacted by Logiscool Dubai regarding this program.',

    // Success
    successTitle: "You're registered!",
    successBody: (n: number, seats_6_9: number, seats_10_12: number, seats_12_14: number) => {
      const parts = [
        seats_6_9 > 0 && `${seats_6_9} × Ages 6–9`,
        seats_10_12 > 0 && `${seats_10_12} × Ages 10–12`,
        seats_12_14 > 0 && `${seats_12_14} × Ages 12–14`,
      ].filter(Boolean).join(', ')
      return { seats: `${n} seat${n > 1 ? 's' : ''}`, breakdown: parts }
    },
    successContact: (email: string) => `Our team will be in touch at ${email}`,
    successQuestion: 'Questions?',

    // Footer
    footerTagline: 'Create. Code. Enjoy.',
    footerCity: 'Dubai, Cityland Mall',

    // Ages data
    ages: [
      {
        range: '6–9', key: '6_9',
        title: 'Create with AI', subtitle: 'Images, Characters & Stories',
        color: '#009CDE', bg: '#EBF8FF', icon: '🎨',
        description: 'A playful introduction to generative AI where younger students learn how words can guide AI tools to create pictures, characters, and story ideas.',
        explore: [
          'Writing simple prompts to generate images and ideas',
          'Creating characters, scenes, and short story concepts',
          'Choosing the best AI results and improving them',
          'Combining images, titles, and descriptions into mini concepts',
          'Understanding that AI is a helper — humans make the creative decisions',
        ],
        outcome: 'Students leave with an early understanding of how generative AI works, how prompts affect results, and how to use AI safely and creatively.',
      },
      {
        range: '10–12', key: '10_12',
        title: 'Prompt, Design & Build', subtitle: 'A Multimedia Concept',
        color: '#5B7A00', bg: '#F5F9E8', icon: '🎬',
        description: 'Students get a deeper introduction to how generative AI can support creative projects across text, images, and sound — learning to guide AI more clearly.',
        explore: [
          'Prompt writing for better text and image results',
          'Generating story ideas, visuals, titles, and sound concepts',
          'Comparing weak and strong prompts to improve AI output',
          'Refining AI-generated content instead of accepting the first result',
          'Basic reliability checks and responsible AI use',
        ],
        outcome: 'Students gain practical experience in prompting, creative decision-making, and responsible AI use while producing a polished multimedia concept.',
      },
      {
        range: '12–14', key: '12_14',
        title: 'Advanced Prompting', subtitle: 'AI-Powered Creative Production',
        color: '#A50050', bg: '#FDF0F6', icon: '🚀',
        description: 'A structured approach to generative AI focusing on prompt strategy, creative direction, output evaluation, and responsible digital production.',
        explore: [
          'Advanced prompting techniques for clearer, more accurate outputs',
          'Generating and refining text, visuals, voices, and scene concepts',
          'Building a consistent creative direction across multiple AI outputs',
          'Evaluating AI results for quality, bias, accuracy, and reliability',
          'Ethical use of AI, misinformation, originality, and digital responsibility',
        ],
        outcome: 'Students leave with stronger AI literacy, practical prompt engineering skills, and a clear understanding of how to use generative AI critically, creatively, and responsibly.',
      },
    ],

    seatGroups: [
      { key: 'seats_6_9', ageKey: '6_9', range: '6–9', color: '#009CDE', bg: '#EBF8FF', icon: '🎨', title: 'Create with AI' },
      { key: 'seats_10_12', ageKey: '10_12', range: '10–12', color: '#5B7A00', bg: '#F5F9E8', icon: '🎬', title: 'Prompt, Design & Build' },
      { key: 'seats_12_14', ageKey: '12_14', range: '12–14', color: '#A50050', bg: '#FDF0F6', icon: '🚀', title: 'Advanced Prompting' },
    ],

    grades: ['KG','Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6','Grade 7','Grade 8','Grade 9','Grade 10','Grade 11','Grade 12'],
  },

  ar: {
    dir: 'rtl' as const,
    lang: 'ar',
    fontFamily: "'Cairo', 'Tajawal', system-ui, sans-serif",

    partnership: 'جمارك دبي × لوجيسكول',

    heroTitle1: 'الذكاء',
    heroTitle2: 'الاصطناعي',
    heroSubtitle: 'الإبداع بالذكاء الاصطناعي، هندسة التعليمات والإنتاج المتعدد الوسائط',
    heroAges: 'للأعمار: ٦–٩، ١٠–١٢، و١٢–١٤ سنة',
    registerNow: 'سجّل الآن',
    explorePrograms: 'استكشف البرامج',

    aboutLabel: 'عن البرنامج',
    aboutHeadline1: 'ذكاء اصطناعي تطبيقي',
    aboutHeadline2: 'لمبدعي المستقبل',
    aboutBody: 'معسكر تطبيقي يستكشف فيه الأطفال كيف يمكن للذكاء الاصطناعي التوليدي إنشاء النصوص والصور والأصوات والمحتوى المتحرك. من خلال تحديات إبداعية موجّهة، يتعلم الطلاب كيفية توجيه الذكاء الاصطناعي وتحسين نتائجه واستخدامه بمسؤولية.',
    skills: [
      { icon: '✍️', label: 'هندسة التعليمات' },
      { icon: '🖼️', label: 'إنشاء الصور بالذكاء الاصطناعي' },
      { icon: '🎵', label: 'الصوت والتعرف على الكلام' },
      { icon: '🛡️', label: 'الاستخدام المسؤول للذكاء الاصطناعي' },
    ],

    programsLabel: 'ثلاثة برامج',
    programsHeadline1: 'اختر',
    programsHeadline2: 'مستواك',
    agesLabel: 'الأعمار',
    whatTheyExplore: 'ما سيتعلمونه',
    learningOutcome: 'النتيجة التعليمية: ',

    registerLabel: 'احجز مقعدك',
    registerHeadline1: 'سجّل',
    registerHeadline2: 'اليوم',
    registerSubtitle: 'أدخل بياناتك أدناه وسيتواصل معك فريقنا قريباً.',

    divParent: 'ولي الأمر',
    divSeats: 'مقاعد ورشة العمل',
    divChildren: (n: number) => `تفاصيل الأطفال (${n} ${n > 1 ? 'أطفال' : 'طفل'})`,
    fieldFullName: 'الاسم الكامل',
    fieldEmail: 'البريد الإلكتروني',
    fieldPhone: 'رقم الهاتف',
    fieldArea: 'منطقة السكن',
    fieldDOB: 'تاريخ الميلاد',
    fieldGrade: 'الصف الدراسي',
    fieldSchool: 'المدرسة',
    placeholderName: 'سارة المنصوري',
    placeholderEmail: 'sarah@email.com',
    placeholderPhone: '+971 50 000 0000',
    placeholderArea: 'دبي مارينا، جي في سي، وسط المدينة…',
    placeholderChildName: 'عمر المنصوري',
    placeholderSchool: 'جيمس، DAIS، ريبتون…',
    selectGrade: 'اختر الصف…',
    seatsNote: (max: number) => `اختر عدد المقاعد لكل فئة عمرية (الحد الأقصى ${max} لكل فئة) — يمكنك الحجز لأكثر من طفل`,
    noSeats: 'لا مقاعد',
    waitlistTitle: 'تم تسجيلك!',
    waitlistBody: 'للأسف، لم تعد هناك مقاعد متاحة لفئة عمر طفلك. سيتواصل معك فريق لوجيسكول الإمارات لترتيب جلسة تجريبية مجانية لدوراتنا في البرمجة في أي مركز لوجيسكول في الإمارات.',
    seatsSelected: (n: number) => `${n} مقعد${n > 1 ? '' : ''} محجوز`,
    maxSeats: (n: number) => `الحد الأقصى ${n} مقاعد لكل فئة`,
    seatDisplay: (v: number, max: number) => `${v} / ${max} مقاعد`,
    childLabel: (i: number, total: number) => `الطفل ${i + 1}${total > 1 ? ' من ' + total : ''}`,
    submitBtn: (n: number) => `تسجيل ${n} مقعد →`,
    submitIdle: 'اختر المقاعد للمتابعة',
    submitting: 'جارٍ التسجيل…',
    errorMinSeats: 'يرجى اختيار مقعد واحد على الأقل.',
    errorGeneric: 'حدث خطأ ما. يرجى المحاولة مجدداً.',
    consent: 'بالتسجيل، توافق على التواصل معك من قِبل لوجيسكول دبي بخصوص هذا البرنامج.',

    successTitle: 'تم التسجيل!',
    successBody: (n: number, seats_6_9: number, seats_10_12: number, seats_12_14: number) => {
      const parts = [
        seats_6_9 > 0 && `${seats_6_9} × الأعمار ٦–٩`,
        seats_10_12 > 0 && `${seats_10_12} × الأعمار ١٠–١٢`,
        seats_12_14 > 0 && `${seats_12_14} × الأعمار ١٢–١٤`,
      ].filter(Boolean).join('، ')
      return { seats: `${n} مقعد`, breakdown: parts }
    },
    successContact: (email: string) => `سيتواصل معك فريقنا على ${email}`,
    successQuestion: 'استفسارات؟',

    footerTagline: 'أبدع. برمج. استمتع.',
    footerCity: 'دبي، سيتي لاند مول',

    ages: [
      {
        range: '٦–٩', key: '6_9',
        title: 'الإبداع مع الذكاء الاصطناعي', subtitle: 'الصور والشخصيات والقصص',
        color: '#009CDE', bg: '#EBF8FF', icon: '🎨',
        description: 'مقدمة ممتعة للذكاء الاصطناعي التوليدي حيث يتعلم الطلاب الصغار كيف يمكن للكلمات توجيه أدوات الذكاء الاصطناعي لإنشاء الصور والشخصيات وأفكار القصص.',
        explore: [
          'كتابة تعليمات بسيطة لإنشاء الصور والأفكار',
          'إنشاء الشخصيات والمشاهد ومفاهيم القصص القصيرة',
          'اختيار أفضل نتائج الذكاء الاصطناعي وتحسينها',
          'دمج الصور والعناوين والأوصاف في مفاهيم مصغّرة',
          'فهم أن الذكاء الاصطناعي مساعد — والإنسان هو صاحب القرار الإبداعي',
        ],
        outcome: 'يغادر الطلاب بفهم مبكر لكيفية عمل الذكاء الاصطناعي التوليدي، وكيف تؤثر التعليمات على النتائج، وكيفية استخدامه بأمان وإبداع.',
      },
      {
        range: '١٠–١٢', key: '10_12',
        title: 'أكتب، صمّم وابنِ', subtitle: 'مشروع متعدد الوسائط',
        color: '#5B7A00', bg: '#F5F9E8', icon: '🎬',
        description: 'يحصل الطلاب على مقدمة أعمق حول كيفية دعم الذكاء الاصطناعي التوليدي للمشاريع الإبداعية عبر النص والصور والصوت — مع تعلّم توجيه الذكاء الاصطناعي بشكل أوضح.',
        explore: [
          'كتابة التعليمات للحصول على نتائج أفضل للنص والصورة',
          'توليد أفكار القصص والصور والعناوين ومفاهيم الصوت',
          'مقارنة التعليمات الضعيفة والقوية لتحسين مخرجات الذكاء الاصطناعي',
          'تحسين المحتوى المُولَّد بدلاً من قبول النتيجة الأولى',
          'فحوصات الموثوقية الأساسية والاستخدام المسؤول للذكاء الاصطناعي',
        ],
        outcome: 'يكتسب الطلاب خبرة عملية في كتابة التعليمات واتخاذ القرارات الإبداعية والاستخدام المسؤول للذكاء الاصطناعي مع إنتاج مفهوم متعدد الوسائط متكامل.',
      },
      {
        range: '١٢–١٤', key: '12_14',
        title: 'التعليمات المتقدمة', subtitle: 'الإنتاج الإبداعي بالذكاء الاصطناعي',
        color: '#A50050', bg: '#FDF0F6', icon: '🚀',
        description: 'نهج منظّم للذكاء الاصطناعي التوليدي يركز على استراتيجية التعليمات والتوجيه الإبداعي وتقييم المخرجات والإنتاج الرقمي المسؤول.',
        explore: [
          'تقنيات التعليمات المتقدمة للحصول على مخرجات أوضح وأكثر دقة',
          'توليد وتحسين النصوص والصور والأصوات ومفاهيم المشاهد',
          'بناء توجيه إبداعي متسق عبر مخرجات متعددة للذكاء الاصطناعي',
          'تقييم نتائج الذكاء الاصطناعي من حيث الجودة والتحيز والدقة والموثوقية',
          'الاستخدام الأخلاقي للذكاء الاصطناعي، والمعلومات المضللة، والأصالة، والمسؤولية الرقمية',
        ],
        outcome: 'يغادر الطلاب بمحو أمية أعلى في مجال الذكاء الاصطناعي ومهارات عملية في هندسة التعليمات وفهم واضح لكيفية استخدام الذكاء الاصطناعي التوليدي بشكل نقدي وإبداعي ومسؤول.',
      },
    ],

    seatGroups: [
      { key: 'seats_6_9', ageKey: '6_9', range: '٦–٩', color: '#009CDE', bg: '#EBF8FF', icon: '🎨', title: 'الإبداع مع الذكاء الاصطناعي' },
      { key: 'seats_10_12', ageKey: '10_12', range: '١٠–١٢', color: '#5B7A00', bg: '#F5F9E8', icon: '🎬', title: 'أكتب، صمّم وابنِ' },
      { key: 'seats_12_14', ageKey: '12_14', range: '١٢–١٤', color: '#A50050', bg: '#FDF0F6', icon: '🚀', title: 'التعليمات المتقدمة' },
    ],

    grades: ['روضة','الصف الأول','الصف الثاني','الصف الثالث','الصف الرابع','الصف الخامس','الصف السادس','الصف السابع','الصف الثامن','الصف التاسع','الصف العاشر','الصف الحادي عشر','الصف الثاني عشر'],
  },
}
