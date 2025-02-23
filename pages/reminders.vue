<script setup>
import { ref, onMounted } from 'vue';

const ahadtih = [
    [`وعن الأغر المزني رضي الله عنه أن رسول الله صلى الله عليه وسلم قال‏:‏ ‏ "‏إنه ليغان على قلبي، وإني لأستغفر الله في اليوم مائة مرة‏"‏ ‏(‏‏(‏رواه مسلم‏)‏‏)‏‏.‏`, `Al-Agharr Al-Muzani (May Allah be pleased with him) said:
    The Messenger of Allah (ﷺ) said, "Sometimes I perceive a veil over my heart, and I supplicate Allah for forgiveness a hundred times in a day."`, "[Muslim]"],
    [`وعن أبي هريرة رضي الله عنه قال‏:‏ سمعت رسول الله صلى الله عليه وسلم يقول “والله إني لأستغفر الله وأتوب إليه في اليوم أكثر من سبعين مرة‏"‏ ‏(‏‏(‏رواه البخاري‏)‏‏)‏‏.`,`Abu Hurairah (May Allah be pleased with him) said:
I heard the Messenger of Allah (ﷺ) saying, "I swear by Allah that I seek Allah's Pardon and turn to Him in repentance more than seventy times a day."`,"[Al-Bukhari]"],
    [`وعن بن عمر رضي الله عنه قال‏:‏ كنا نعد لرسول الله صلى الله عليه وسلم في المجلس الواحد مائة مرة‏:‏ ‏ "‏رب اغفر لي، وتب على إنك أنت التواب الرحيم‏"‏ ‏(‏‏(‏رواه أبوداود والترمذي‏)‏‏)‏‏.‏ وقال : (( حديث حسن صحيح غريب )) `,`Ibn 'Umar (May Allah be pleased with them) said:
We counted Messenger's saying a hundred times during one single sitting: Rabb- ighfir li, wa tubb 'alayya, innaka Antat-Tawwabur-Rahim. (My Rubb! Forgive me and pardon me. Indeed, You are the Oft-Returning with compassion and Ever Merciful."`,"[Abu Dawud and At- Tirmidhi]."],
    [`وعن ابن عباس رضي الله عنه قال‏:‏ قال رسول الله صلى الله عليه وسلم ‏:‏ “من لزم الاستغفار ، جعل الله له من كل ضيق مخرجاً ومن كل هم فرجاً، ورزقه من حيث لا يحتسب‏"‏ رواه أبو داود‏‏.‏`, `Ibn 'Abbas (May Allah be pleased with them) said:
The Messenger of Allah (ﷺ) said, "If anyone constantly seeks pardon (from Allah), Allah will appoint for him a way out of every distress and a relief from every anxiety, and will provide sustenance for him from where he expects not."`,"[Abu Dawud, At-Tirmidhi and Al-Hakim (on conditions of Al-Bukhari and Muslim for accepting Hadith)]"],
    [`وعن شداد بن أوس رضي الله عنه عن النبي صلى الله عليه وسلم قال‏:‏ ‏"‏سيد الإستغفار أن يقول العبد ‏:‏ اللهم أنت ربي، لا إله إلا أنت ، خلقتني وأنا عبدك، وأنا على عهدك ووعدك ما استطعت أعوذ بك من شر ما صنعت أبوء لك بنعمتك علي، وأبوء بذنبي، فاغفر لي فإنه لا يغفر الذنوب إلا أنت، من قالها من النهار موقنا بها، فمات من يومه قبل أن يمسي، فهو من أهل الجنة، ومن قالها من الليل وهو موقن بها فمات قبل أن يصبح، فهو من أهل الجنة” ‏(‏‏(‏رواه البخاري‏)‏‏)‏‏.`, `Shaddad bin Aus (May Allah be pleased with him) said:
The Prophet (ﷺ) said, "The best supplication for seeking forgiveness (Syed-ul- Istighfar) is to say: 'Allahumma Anta Rabbi, la ilaha illa Anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mastata'tu, a'udhu bika min sharri ma sana'tu, abu'u laka bini'matika 'alayya, wa abu'u bidhanbi faghfir li, fa innahu la yaghfirudh-dhunuba illa Anta. (O Allah! You are my Rubb. There is no true god except You. You have created me, and I am Your slave, and I hold to Your Covenant as far as I can. I seek refuge in You from the evil of what I have done. I acknowledge the favours that You have bestowed upon me, and I confess my sins. Pardon me, for none but You has the power to pardon).' He who supplicates in these terms during the day with firm belief in it and dies on the same day (before the evening), he will be one of the dwellers of Jannah; and if anyone supplicates in these terms during the night with firm belief in it and dies before the morning, he will be one of the dwellers of Jannah."`,"[Al-Bukhari]"],
    [`وعن ثوبان رضي الله عنه قال‏:‏ كان رسول الله صلى الله عليه وسلم إذا انصرف من صلاته ، استغفر الله ثلاثاً وقال‏:‏ ‏"‏اللهم أنت السلام، ومنك السلام، تباركت يا ياذا الجلال والإكرام‏"‏ قيل للأوزاعي- وهو أحد رواته‏:‏ كيف الإستغفار‏؟‏ قال‏:‏ يقول‏:‏ ‏"‏أستغفر الله ، أستغفر الله‏"‏ ‏(‏‏(‏رواه مسلم‏)‏‏)‏‏` ,`Thauban (May Allah be pleased with him) reported:
Whenever the Messenger of Allah (ﷺ) finished his Salat (prayer), he would beg forgiveness three times [by saying, 'Astaghfirullah' (3 times)] and then he would say: "Allahumma Antas-Salamu, wa minkas-Salamu, tabarakta ya Dhal-Jalali wal-Ikram. (O Allah! You are the Bestower of security and security comes from You; Blessed are You. O Possessor of glory and honour)." Imam Al-Auza'i (one of the subnarrators) of this Hadith was asked: "How forgiveness should be sought?" He replied: "I say: Astaghfirullah, Astaghfirullah (I seek forgiveness from Allah. I seek forgiveness from Allah)."`,"[Muslim]"],
    [`وعن عائشة رضي الله عنها قالت‏:‏ كان رسول الله صلى الله عليه وسلم يكثر أن يقول قبل موته ‏ "‏سبحان الله وبحمده، أستغفر الله، وأتوب إليه‏"‏ ‏(‏‏(‏متفق عليه‏)‏‏)‏‏`,`'Aishah (May Allah be pleased with her) reported:
Prior to his demise, the Messenger of Allah (ﷺ) used to supplicate frequently: Subhan Allahi wa bihamdihi; Astaghfirullaha wa atubu ilaihi (Allah is free from imperfection, and I begin with praising Him. I beg forgiveness from Allah and I turn to Him in repentance."`,"[Al-Bukhari and Muslim]"]
];

const hadith = ref(['Loading...', 'Please wait while a hadith is being fetched.', '']);
const loading = ref(true);

const loadRandomHadith = () => {
  try {
    const index = Math.floor(Math.random() * ahadtih.length);
    const selected = ahadtih[index] || ['No data', 'No translation available', ''];
    hadith.value = selected;
    loading.value = false;
  } catch (error) {
    console.error('Error loading hadith:', error);
    hadith.value = ['Error', 'An error occurred while loading the hadith.', ''];
  }
};

onMounted(() => {
  loadRandomHadith();
});
</script>

<template>
  <div class="min-h-screen bg-emerald-50 p-6">
    <header class="mb-8">
      <div class="max-w-2xl mx-auto text-center">
        <h3 class="text-3xl font-bold text-emerald-800 mb-2">Hadith on the Habit</h3>
      </div>
    </header>

    <div v-if="loading" class="max-w-2xl mx-auto text-center text-gray-500">
      Loading a hadith...
    </div>

    <div v-else-if="Array.isArray(hadith) && hadith.length > 0" class="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 mb-10">
      <p class="text-emerald-600 text-lg font-bold mb-2">{{ hadith[0] || 'No data' }}</p>
       <!-- Separator -->
       <div class="flex items-center justify-center mb-6">
          <div class="h-px w-16 bg-emerald-200"></div>
          <i-lucide-star class="mx-4 w-4 h-4 text-emerald-400" />
          <div class="h-px w-16 bg-emerald-200"></div>
        </div>
      <p class="text-emerald-600">{{ hadith[1] || 'No data' }}</p>
      <p class="text-gray-500 text-sm italic">{{ hadith[2] || 'No source available' }}</p>
    </div>

    <div v-else class="max-w-2xl mx-auto text-center text-red-500">
      No hadith available.
    </div>

    <div class="text-center mt-4">
      <button @click="loadRandomHadith" class="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition">
        Show Another Hadith
      </button>
    </div>
  </div>
</template>
