const questions = [
  {
    question: "1.Kapan Indonesia memproklamasikan kemerdekaannya?",
    options: ["17 Agustus 1945", "1 Juni 1945", "20 Mei 1908", "28 Oktober 1928"],
    answer: 0,
  },
  {
    question: "2.Siapa presiden pertama Republik Indonesia?",
    options: ["Soekarno", "Soeharto", "Habibie", "Megawati Soekarnoputri"],
    answer: 0,
  },
  {
    question: "3.Apa nama kerajaan Hindu-Buddha terbesar di Indonesia?",
    options: ["Tarumanegara", "Sriwijaya", "Majapahit", "Mataram"],
    answer: 2,
  },
  {
    question: "4.Peristiwa Sumpah Pemuda terjadi pada tahun berapa?",
    options: ["1908", "1928", "1945", "1966"],
    answer: 1,
  },
  {
    question: "5.Siapa yang membaca teks proklamasi kemerdekaan Indonesia?",
    options: ["Mohammad Hatta", "Soekarno", "Ahmad Yani", "Jenderal Sudirman"],
    answer: 1,
  },
  {
    question: "6.Kerajaan Islam pertama di Indonesia adalah?",
    options: ["Demak", "Aceh", "Mataram Islam", "Samudra Pasai"],
    answer: 3,
  },
  {
    question: "7.Kapan Belanda menjajah Indonesia?",
    options: ["1602", "1700", "1800", "1901"],
    answer: 0,
  },
  {
    question: "8.Apa tujuan utama VOC didirikan di Indonesia?",
    options: [
      "Melakukan eksplorasi ilmiah",
      "Mendirikan koloni",
      "Menyebarkan agama",
      "Menguasai perdagangan rempah-rempah",
    ],
    answer: 3,
  },
  {
    question: "9.Perang Diponegoro terjadi pada tahun berapa?",
    options: ["1825-1830", "1800-1805", "1900-1905", "1945-1950"],
    answer: 0,
  },
  {
    question: "10.Apa nama organisasi pergerakan nasional pertama di Indonesia?",
    options: ["Sarekat Islam", "Budi Utomo", "Indische Partij", "Muhammadiyah"],
    answer: 1,
  },
];


let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");

function loadQuestion() {
  const q = questions[currentQuestion];

  // Atur pertanyaan
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  // Render pilihan jawaban
  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.className = "btn btn-outline-primary btn-lg";

    // Tandai jika jawaban sebelumnya sudah dipilih
    if (q.userAnswer === index) {
      btn.classList.add("btn-selected");
    }

    btn.onclick = () => selectAnswer(index, btn);
    optionsEl.appendChild(btn);
  });

  // Atur tombol navigasi
  prevBtn.disabled = currentQuestion === 0;
  nextBtn.disabled = !q.hasOwnProperty("userAnswer"); // Nonaktifkan jika belum ada jawaban
}


let hasAnswered = false; // Tambahkan variabel global untuk melacak status jawaban

function selectAnswer(index, btn) {
  // Tandai semua tombol agar tidak terlihat sebagai dipilih
  Array.from(optionsEl.children).forEach((option) => {
    option.classList.remove("btn-selected");
  });

  // Tandai jawaban yang dipilih
  btn.classList.add("btn-selected");

  // Simpan jawaban pengguna di atribut pertanyaan
  questions[currentQuestion].userAnswer = index;

  // Aktifkan tombol Next
  nextBtn.disabled = false;
}


nextBtn.onclick = () => {
  hasAnswered = false; // Reset status jawaban untuk pertanyaan berikutnya
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
};

prevBtn.onclick = () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
};

function showResult() {
  // Hitung skor akhir
  score = questions.reduce((total, q) => {
    return total + (q.userAnswer === q.answer ? 1 : 0);
  }, 0);

  // Tampilkan hasil
  document.getElementById("quiz-container").classList.add("hidden");
  resultEl.classList.remove("hidden");
  scoreEl.textContent = `${score} / ${questions.length}`;
}


document.addEventListener("DOMContentLoaded", () => {
  AOS.init();
  loadQuestion();
});
