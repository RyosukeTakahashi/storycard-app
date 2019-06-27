export const shuffle = function(array) {
  var currentIndex = array.length;
  var temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

export const storyPhrases = [
  "しーっ！！",
  "な、なんだあれは？",
  "キーンコーン\nカーンコーン",
  "ゴゴゴゴゴ",
  "そのとき",
  "あの日のこと",
  "わかるかい？",
  "時は戦国",
  "ちこくちこくー！",
  "も、もうこんな時間？",
  "思い出す",
  "あれから何年だろう",
  "久しぶりに",
  "吾輩は",
  "考えてみてほしい",
  "痛い",
  "だんだん",
  "姿を消した",
  "音が聞こえる",
  "大人って生き物は",
  "そこへ",
  "私が小さいとき",
  "うだる暑さ",
  "毎年のことだ",
  "雪が来る",
  "十月×日",
  "100年たって",
  "せかいじゅうに",
  "ふしぎなことに",
  "ところが",
  "どうやら",
  "やれやれ",
  "ケータイが鳴った",
  "ミーン ミーン ミーン",
  "トンネルを抜けると",
  "なんだか",
  "ある日",
  "偶然にも",
  "いつのまにか",
  "残念ながら",
  "生き返った",
  "正直言って",
  "圧倒的だ"
];

export const logicalPhrases = [
  "偶然にも",
  "そもそも",
  "そういうわけで",
  "もし",
  "そして",
  "いつか",
  "いいかえると",
  "個人的には",
  "歴史的には",
  "したがって",
  "さもなければ",
  "事実",
  "なぜなら",
  "対象的に",
  "一般的には",
  "それはさておき",
  "ところで",
  "科学的には",
  "そのため",
  "したがって",
  "ゆえに",
  "しかしながら",
  "けれども",
  "ところがどっこい",
  "それなのに",
  "にもかかわらず",
  "また",
  "および",
  "同じく",
  "このように",
  "おまけに",
  "そればかりでなく",
  "一方",
  "逆に",
  "For example,",
  "ただし",
  "もっとも",
  "実は",
  "特に",
  "なかでも",
  "さて",
  "客観的には",
  "すなわち",
  "次に",
  "ときに",
  "ようするに",
  "つまり",
  "もしくは"
];
