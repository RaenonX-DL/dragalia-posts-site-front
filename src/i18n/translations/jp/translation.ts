import {TranslationStruct} from '../definition';

export const translation: TranslationStruct = {
  donation: {
    tierS1: 'Tier S-1',
    tierS2: 'Tier S-2',
    tierSSS: 'Tier SSS',
  },
  game: {
    data: {
      titleSelf: 'ゲーム情報',
      titleActive: 'スキル',
      titleEx: 'EXアビ / リンクEXアビ',
      titleOthers: '他の情報',
      titlePassive: 'アビリティ',
      titleSkillAtk: '攻擊スキル',
      titleSkillSup: 'サポートスキル',
      titleStory: 'ストーリー',
    },
    ex: {
      name: {
        filterElement: '屬性',
        filterExBuffParam: 'EXアビリティ',
        filterChainedExBuffParam: 'リンクEXアビリティ',
        exAbility: 'EXアビ効果',
        chainedExAbility: 'リンクEXアビ効果',
      },
      desc: {
        filterElement: '属性を選択してキャラ検索できます。火、風，などと複数属性も選択可能です。' +
          '属性を１つも選択していない場合、全属性が表示されます。',
        filterExBuffParam: 'EXアビを選択してキャラ検索できます。複数選択した場合、いづれかに合致するキャラが表示されます。何も選択していない場合、全てのキャラが表示されます。',
        filterChainedExBuffParam: 'リンクEXアビを選択してキャラ検索できます。複数選択した場合、いづれかに合致するキャラが表示されます。何も選択していない場合、全てのキャラが表示されます。',
        exAbility: 'EXアビの効果はパーティ内全員にかかります。またキャラ同士の属性が異なっても効果が得られます。しかし同種のEXアビが重複した場合は最も高い効果のみが有効になります。',
        chainedExAbility: 'EXアビの効果はパーティ内全員にかかります。EXアビと異なるのは２点、１：基本的にキャラの属性が一致している同士でのみ効果が得られ、' +
          '２：同種のEXアビが重複した場合は効果が加算されます。',
      },
      badge: {
        infoCooldown: 'クールタイム {{cooldownSec}} 秒',
        infoDurationCount: '使用可能 {{durationCount}} 回',
        infoDurationSec: '効果時間 {{durationSec}} 秒',
        infoMaxOccurrences: '最大 {{maxOccurrences}} 回',
        infoMaxStackCount: '最大 {{maxStackCount}} 個',
        infoProbabilityPct: '{{probabilityPct}}% 確率',
        infoTargetAction: '対象アクション: {{targetAction}}',
      },
    },
    skillAtk: {
      name: {
        atk: '攻擊',
        atkInGame: 'ゲーム内表示',
        atkConditional: '条件付き攻UP (%)',
        atkBuff: 'バフ (%)',
        buffBoost: 'バフ個数',
        buffCount: 'バフ個数',
        buffZoneSelf: 'バフフィールドの数 (自身が作成)',
        buffZoneAlly: 'バフフィールドの数 (味方が作成)',
        ex: 'EXアビ',
        exBlade: '刀',
        exWand: 'ロッド',
        crt: 'クリティカル',
        crtRate: 'クリティカル率 (%)',
        crtDamage: 'クリティカルダメージ (%)',
        crtInspired: '超ヒラメキ',
        skill: 'スキルダメージ',
        skillBuff: 'バフ (%)',
        skillPassive: 'パッシブのスキルダメ合計 (%)',
        skillEnergized: '超やる気',
        punisher: '特効',
        punisherBk: 'ブレイク 特効 (%)',
        punisherOthers: 'その他 特効 (%)',
        other: 'その他',
        otherElementBonus: '属性ダメージ (%)',
        otherHp: 'HP (%)',
        target: '攻撃ターゲット関係',
        targetElement: '屬性',
        targetAffliction: '状態異常',
        targetState: {
          title: '攻撃ターゲットのモードゲージ状態',
          none: '通常',
          od: 'OD',
          bk: 'BK',
        },
        targetDefDown: '防御ダウン (%)',
        targetDef: '基礎防御力',
        targetDefBk: 'BK 防御ダウン率',
        filter: 'フィルタ',
        filterElement: '屬性',
        filterAffliction: '状態異常',
        filterOther: 'その他',
        filterSharedOnly: 'シェアスキルのみ表示',
        filterDispelOnly: 'Dispel Only',
      },
      desc: {
        atk: '攻撃力に関するパラメータ全般。',
        atkInGame: '通称、攻ステ値。この値はキャラ詳細画面を開いた時の値で、武器、ドラゴン、護符、ボーナス他を含む値です。' +
          '※将来的には、キャラ、武器、などを選択したら自動計算させる予定です。',
        atkConditional: '例：疾風怒濤、HP70%以上で、等。',
        atkBuff: 'クエスト中、画面下に表示される攻撃バフアイコン。バフによるUP上限は200%。',
        buffBoost: 'バフの個数だけ【ブースト】がかかってダメージが増えるスキルがある。その計算用。',
        buffCount: 'キャラにかかっているバフ個数。※ただし、ヒラメキ、やる気はレベルに関係なくバフ1個扱い。',
        buffZoneSelf: '自身で作ったバフフィールドの数。',
        buffZoneAlly: '味方が作ったバフフィールドの数。',
        ex: 'サブキャラによるEXアビはパッシブ扱い。※例外的なEXアビ（例：屬性ダメ、攻防ダウン特効、クリティカルダメ、など）は' +
          '直接各項目に入力してください。',
        crt: 'クリティカルに関するパラメータ全般。',
        crtRate: 'クリティカル率。なお斧キャラは基礎値4%、他武器種は基礎値2%を持ちます。※超ヒラメキを有効にしている場合、クリティカル率100%に置き換えて計算します。',
        crtDamage: 'クリティカルダメージ率。基礎値170%を持ちますが既に含めて計算しています。バフによるUP上限は400%',
        skill: 'スキルダメージに関するパラメータ全般。',
        skillBuff: 'クエスト中、画面下に表示されるクリティカルダメバフアイコン。バフによるUP上限は200%。※闇竜ケットシーによるバフ+180% はここに入ります。',
        skillPassive: 'ドラゴンや護符による効果はここに入ります。※闇竜ケットシーによる効果はパッシブ扱いではなくバフ扱いなので、ここには入りません。',
        punisher: '特効に関するパラメータ全般。',
        punisherBk: 'ブレイク特効は、その他特効と乗算関係にある。',
        punisherOthers: 'その他特効。(例：状態異常特効、OD特効、攻防ダウン特効、など)',
        other: 'その他、未分類のパラメータ全般。',
        otherElementBonus: '属性ダメ。(例：光ピアニー、ブレイヴ系ドラゴン．など)',
        otherHp: '現在HP',
        target: '攻撃ターゲットの状態に関するパラメータ全般。',
        targetElement: '攻撃ターゲットの属性。',
        targetAffliction: '攻撃ターゲットに付与されている状態異常。',
        targetState: {
          title: '攻撃ターゲットのモードゲージの状態。(通常orオーバードライブ状態orブレイク状態)',
        },
        targetDefDown: '付与した防御ダウンデバフ。(クエスト中、ボスHPバーの上に表示されるデバフアイコンのこと)',
        targetDef: '攻撃ターゲットの基礎防御力。通常は 10。※光アギトカイエンは 15 (2020/12/20)。',
        targetDefBk: '攻撃ターゲットのBK時の防御ダウン率。通常は 0.6。※闇アギトタルタロスや火アギトルヴ絕級は 0.8。(またバーサク状態では 1.25)。',
        filter: '条件を選択してキャラスキル検索できます。複数選択した場合、いづれかに合致するキャラスキルが表示されます。何も選択していない場合、全てのキャラスキルが表示されます。',
        filterElement: '例；火、風，を選択するとその２属性いづれかのキャラスキルだけが表示されます。',
        filterAffliction: '例；火傷、毒を選択するといづれかを付与できるキャラスキルだけが表示されます。' +
          '※状態異常付与できるスキルを検索する機能です。(状態異常特効を持つスキルを検索しているのではありません。)',
        filterOther: 'その他フィルタリング条件。シェアスキルのみ検索可能です。',
      },
      display: {
        title: '顯示資訊',
        desc: '選擇想要在結果中看到的資訊。',
        options: {
          actualDamage: '實際傷害',
          damageInfo: '傷害資訊',
          damageDistribution: '傷害分布',
          affliction: '異常狀態',
          spInfo: 'SP 效率/資訊',
          animationInfo: '動畫資訊',
        },
      },
      entry: {
        notCancelable: 'モーションキャンセル不可',
        cancelable: 'モーション発動 {{cancelTime}} 秒後キャンセル可能',
        stackable: '重複可能',
        unstackable: '重複不可',
        affliction: '{{affliction}} @ {{afflictionTime}} 秒 ({{afflictionProbabilityPct}}% / {{afflictionDuration}} 秒)',
        buffCount: 'バフ個数が多いほどダメUP',
        buffCountDescCapped: '+{{each}}% of the total mod for each buff; Capped at {{limit}}%',
        buffCountDescUncapped: '+{{each}}% of the total mod for each buff; Uncapped',
        buffZone: 'バフフィールド個数が多いほどダメUP',
        buffZoneDesc: '自身の作ったフィールド上の敵に{{selfBoost}}% 追加ダメ1ヒット / 味方の作ったフィールド上の敵に{{allyBoost}}% 追加ダメ1ヒット',
        dispel: 'バフ解除',
        dispelDesc: '＠ {{dispelTiming}} 秒',
        crisisUp: '残HP少ないほどダメUP',
        crisisUpDesc: '最大ダメ倍率 {{maxRate}} 倍',
        crisisDown: '残HP多いほどダメUP',
        crisisDownDesc: '最低ダメ倍率 {{maxRate}} 倍',
      },
      summary: {
        atk: '攻擊 - {{atkVal}}',
        atkData: '攻ステ値: {{atkInGame}} / パッシブ: +{{atkConditionalPct}}% / バフ: +{{atkBuffPct}}%',
        buff: 'Buff',
        buffData: 'バフ個数: {{buffCount}} / バフフィールド数: {{buffZoneSelf}} (自身) {{buffZoneAlly}} (味方)',
        ex: 'EX',
        exBlade: '刀',
        exWand: 'ロッド',
        exNone: '(通常)',
        crt: 'クリティカル - {{crtVal}}',
        crtInspired: '超ヒラメキ',
        crtRate: 'クリティカル率 {{crtRate}} %',
        crtDamage: 'クリティカルダメ +{{crtDamage}} %',
        skill: 'スキル - {{skillVal}}',
        skillPassive: 'パッシブ +{{skillPassivePct}}%',
        skillBuff: 'バフ +{{skillBuffPct}}%',
        skillEnergized: '超やる気',
        punisher: '特効 - {{punisherVal}}',
        punisherData: 'BK 特効 {{punishersBkPct}}% / その他特効 {{punishersOtherPct}}%',
        target: '目標状態',
        targetData: {
          element: 'Element: ',
          afflictions: 'Afflictions: ',
          state: 'State: {{state}}',
          def: 'Base DEF {{def}} / DEF Down -{{defDownPct}}% / BK Rate {{defBkRate}}',
        },
        other: 'その他',
        otherData: '属性ダメ +{{otherElemBonusPct}}% / HP {{otherCurrentHpPct}}%',
      },
      collapse: '展開 / 折り畳み',
      error: {
        noInfoToDisplay: 'Please select at least 1 info to display.',
        noResult: 'No available results.',
        presetMustLogin: 'You must login to use the input parameter preset via link.',
      },
      animation: {
        earliest: '{{time}} sec @ Earliest',
        earliestUnavailable: 'Unavailable',
        hitTiming: 'Hit Timing',
        hitTimingHeader: 'Hit Timing (sec)',
        cancelInfo: 'Cancel Info',
        cancelHeader: {
          action: 'Action',
          time: 'Time (sec)',
          preConditions: 'Other Conditions',
        },
      },
      sort: {
        text: '排序: {{sortBy}}',
        damageDesc: '傷害',
        sp: 'SP',
        ssp: 'SSP',
      },
      spInfo: {
        efficiencyIndexes: '效率指標',
        efficiency: {
          modPctPer1KSp: '% / 1K SP',
          modPctPer1KSsp: '% / 1K SSP',
          secPer1KSp: '異常效期 (秒) / 1K SP',
          secPer1KSsp: '異常效期 (秒) / 1K SSP',
        },
        sp: 'SP',
        spGradualFill: '{{secs}} secs ({{sp}})',
        spPctPerSec: 'SP Regen % / sec',
        ssp: 'SSP',
        ssCost: 'SS Cost',
      },
      info: {
        affliction: '部分異常狀態的時效為浮動值 (冰凍、暈眩較為常見)。以下計算中所使用的秒數為最大值。',
        animation: '動畫資訊和實際可能有所落差。對應角色評測中有實際技能動畫。',
        preset: '點選分享按鈕以生成參數網址。',
        presetExpiry: '網址將於最後使用日期起 30 日後刪除。',
      },
    },
    tools: {
      titleSelf: '他のツール',
      rotation: 'ルーティン計算',
    },
  },
  userControl: {
    noUid: '該当するアカウントが見当たりません。',
    noUidDetails: '該当するアカウントIDが見当たりません。もう一度ログインし直してください。',
    login: 'ログイン',
    logout: 'ログアウト',
    loading: '読み込み中...',
  },
  lang: {
    inUse: '使用中',
  },
  message: {
    donation: {
      url: '寄付先URL',
      info: '寄付ありがとうございます！Ko-Fi、Paypalで寄付ができます。寄付額が$1を超えている間、広告なしでご利用できます。' +
        '広告なしでご利用できるのは１ヶ月です。\n\n' +
        '広告なしを有効にするためには、寄付に用いたのと同じEmailアドレスでログインしてください。',
    },
    warning: {
      adminOnly: 'You must have admin privilege to access this page.',
      truncated: '検索結果が多過ぎるため、一部だけ表示しています。({{displayed}} 表示中 / 全 {{returned}})。' +
        '第{{displayed}}個目以降の検索結果を見たい場合は検索結果が少なくなるよう再検索してください。',
    },
    info: {
      constructing: '工事中です。\n\n' +
        '### 完成したら各SNSの上でお知らせします。(例: 掲示板、Facebook 、LINE…など) ' +
        '\n\n### メール通知機能も作成中ですのでお待ちください。',
      fetching: '調査中...',
      welcome: '同盟「OM」製作のドラガリ攻略サイトへようこそ！工事中の機能やページも多いですが、どうぞよろしくお願いいたします。\n\n' +
        '現在 **高難易度クエスト攻略、キャラドラゴン評価** のページの一部は完成しています、ご覧ください。\n\n' +
        'ページを選択したら說明もついてます。',
    },
    error: {
      auth: {
        noProvider: 'No authentication providers available.',
      },
    },
  },
  misc: {
    add: '追加',
    omMember: 'OM 同盟メンバー',
    omGroup: 'OM グループメンバー',
    openGif: '點擊以開啟 GIF 圖片',
    remove: '削除',
    search: '検索',
    searchKeyword: 'Keyword',
  },
  meta: {
    inUse: {
      about: {
        title: 'サイトについて',
        description: 'description',
      },
      analysisIndex: {
        title: '評価のカタログ',
        description: 'description',
      },
      analysisNewChara: {
        title: '新キャラの評価',
        description: 'description',
      },
      analysisNewDragon: {
        title: '新ドラゴンの評価',
        description: 'description',
      },
      analysisEdit: {
        title: '評価の編集 - {{name}}',
        description: '{{name}}を編集するページ。',
      },
      analysisPost: {
        title: '【評価】{{name}}',
        description: '{{name}}の評価',
      },
      home: {
        title: 'ホームページ',
        description: 'description',
      },
      questEdit: {
        title: 'クエスト攻略の編集 #Q{{title}}',
        description: 'クエスト攻略 #Q{{pid}}の編集ページ。',
      },
      questList: {
        title: 'クエスト攻略カタログ',
        description: 'クエスト攻略のカタログ。',
      },
      questNew: {
        title: 'クエスト攻略の追加',
        description: 'description',
      },
      questPost: {
        title: '【攻略】{{title}}',
        description: 'TBA',
      },
      site: {
        title: 'ドラガリ攻略サイト by OM',
        description: 'description',
      },
      thanks: {
        title: 'ご協力に感謝',
        description: 'description',
      },
      gameData: {
        ex: {
          title: 'TBA',
          description: 'description',
        },
        skillAtk: {
          title: 'TBA',
          description: 'description',
        },
      },
      auth: {
        signIn: {
          title: 'Login',
          description: 'Sign-in to the website to enable more features.',
        },
      },
    },
    error: {
      401: {
        title: '權限不足',
        description: '權限不足，請檢查是否已登入。',
      },
      404: {
        title: 'ページが存在しません',
        description: 'description',
      },
    },
    temp: {
      constructing: {
        title: '工事中',
        description: 'description',
      },
    },
    suffix: ' | ドラガリ攻略 by OM',
  },
  posts: {
    analysis: {
      titleSelf: 'ユニット評価',
      forceStrike: 'バーストアタック',
      keywords: 'キーワード',
      normalAttack: '通常攻撃',
      notesDragon: '記事',
      unitName: '評価の名前',
      unitType: '評価の対象',
      passive: 'アビリティ',
      skills: 'スキル情報',
      story: 'ストーリー',
      suitable: '相性良いキャラ',
      summary: '結論',
      summonResult: '個人のガチャ結果',
      summonExplanation: {
        title: 'About this section',
        description: 'Some people may wonder why this is listed in my analysis. ' +
          'When I started writing analysis, ' +
          'I wanted to let people know that getting lucky is pure luck; ' +
          'getting unlucky is just a usual thing. ' +
          'I never thought that I would end up dedicating writing analysis like this, ' +
          'and I still want to let people know what was mentioned about luck, ' +
          'so I decided to leave it instead of removing it.',
      },
      tipsBuilds: 'ポイント & おすすめ装備編成',
      ultimate: '必殺技',
      videos: '関する動画',
      error: {
        noPostId: '文章 ID 未指定。',
        noResult: '検索結果あありませんでした。条件を変更して再度検索してください。',
        unknownType: '文の種類が分別できない - {{analysisType}}。',
        unavailable: 'Analysis Unavailable',
      },
      skill: {
        name: 'スキルの名前',
        info: 'スキルの情報',
        rotations: 'スキルのシフト',
        tips: 'スキルのポイント',
      },
      type: {
        character: 'キャラ',
        dragon: 'ドラゴン',
      },
    },
    info: {
      titleSelf: '本ページの情報',
      id: 'ID',
      lastModified: '最後編集は',
      published: '発表は',
      title: 'お題',
      viewCount: '閲覧回数',
      viewCountComplete: '閲覧 {{count}} 回',
    },
    manage: {
      add: '文を追加する',
      addChara: '文を追加する (キャラ)',
      addDragon: '文を追加する(ドラゴン)',
      addNote: '指定 IDあれば，文が多国言語版もあります。サイトはその ID と言語検査する。対応できない文のID は使えない。',
      collapse: 'ズームイン/アウト',
      edit: '文を編集',
      fetchListFailed: '文のリスト獲得失敗。({{error}})',
      fetchPostFailed: '文の獲得失敗。({{error}})',
      md: 'Markdown',
      editNote: '記事を編集する',
      modifyTime: '日期を編集する',
      postNotExists: '文がありません。',
      preview: 'プレビュー',
      publish: '文を発表する',
      publishFailed: '発表失敗',
    },
    message: {
      altLang: '本ページは言語が {{langUi}} 版がないため、代わりに言語が {{langPost}} 版を表示しています。',
      otherLang: '本ページは他言語版もあります。',
      published: '文を発表しました。',
    },
    misc: {
      titleSelf: '他の文章',
    },
    quest: {
      titleSelf: 'クエスト攻略',
      addendum: '記事',
      builds: '配置',
      character: 'キャラ',
      general: '通常注意ポイント',
      positional: 'キャラ/職業別の攻略',
      rotations: 'ルーティン / スキル順番',
      tips: 'ポイント',
      title: 'お題',
      video: '関する動画',
    },
  },
};
