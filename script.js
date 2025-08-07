// Menunggu seluruh konten HTML selesai dimuat sebelum menjalankan script
document.addEventListener("DOMContentLoaded", () => {

    // ==================== 1. DARK/LIGHT MODE TOGGLE ====================
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    // Cek tema dari localStorage saat halaman dimuat
    if (localStorage.getItem("theme") === "light-mode") {
        body.classList.add("light-mode");
    }

    // Tambahkan event listener jika tombol theme-toggle ada
    if (themeToggle) {
        // Atur emoji awal berdasarkan tema saat ini
        themeToggle.textContent = localStorage.getItem("theme") === "light-mode" ? "🌙" : "☀️";

        // Tambahkan event listener saat tombol diklik
        themeToggle.addEventListener("click", () => {
            body.classList.toggle("light-mode");
            if (body.classList.contains("light-mode")) {
                localStorage.setItem("theme", "light-mode");
                themeToggle.textContent = "🌙"; // Ubah emoji menjadi bulan
            } else {
                localStorage.setItem("theme", "dark-mode");
                themeToggle.textContent = "☀️"; // Ubah emoji menjadi matahari
            }
        });
    }

    // ==================== 2. ANIMASI FADE-IN (Sudah diperbaiki) ====================
    // Menambahkan class 'show' ke elemen .content-section untuk memicu animasi CSS
    document.querySelectorAll(".content-section").forEach(section => {
        section.classList.add("show");
    });

    // ==================== 3. HAMBURGER MENU ====================
    const hamburgerMenu = document.getElementById("hamburger-menu");
    const nav = document.querySelector("nav");

    if (hamburgerMenu) {
        hamburgerMenu.addEventListener("click", () => {
            hamburgerMenu.classList.toggle("active");
            nav.classList.toggle("active");
        });

        // Menutup menu saat link navigasi diklik
        document.querySelectorAll("nav a").forEach(link => {
            link.addEventListener("click", () => {
                hamburgerMenu.classList.remove("active");
                nav.classList.remove("active");
            });
        });
    }
});


// ==================== 4. LOGIKA KUIS INTERAKTIF ====================
const quizQuestions = [
    {
        pertanyaan: "Menggunakan ChatGPT untuk merangkum materi kuliah tanpa menyebutkan sumbernya adalah contoh dari...",
        pilihan: ["Kolaborasi yang baik", "Tantangan etika AI", "Penggunaan AI yang efektif", "Penghematan waktu"],
        jawaban: "Tantangan etika AI",
        penjelasan: "Tantangan etika AI muncul ketika penggunaan AI berpotensi merugikan, seperti plagiarisme. Penting untuk selalu mengutip sumber, meskipun itu adalah AI."
    },
    {
        pertanyaan: "AI dilatih dengan data yang ada. Jika data tersebut bias, maka hasilnya juga bisa bias. Isu ini dikenal sebagai...",
        pilihan: ["Plagiarisme", "Ketergantungan AI", "Bias AI", "Penyalahgunaan data"],
        jawaban: "Bias AI",
        penjelasan: "Bias AI terjadi saat data pelatihan mencerminkan bias dari dunia nyata. Ini bisa menyebabkan AI membuat keputusan yang tidak adil atau tidak akurat."
    },
    {
        pertanyaan: "Apa risiko utama jika terlalu sering mengandalkan AI untuk berpikir?",
        pilihan: ["Skill berpikir kritis bisa menurun", "Tugas selesai lebih cepat", "Mendapatkan ide baru", "Bisa mengakses banyak data"],
        jawaban: "Skill berpikir kritis bisa menurun",
        penjelasan: "Terlalu bergantung pada AI bisa mengurangi kemampuan kita untuk berpikir secara mandiri, memecahkan masalah, dan mempertanyakan informasi."
    },
    {
        pertanyaan: "Sebuah video 'deepfake' yang terlihat sangat meyakinkan digunakan untuk menyebarkan berita bohong tentang seorang tokoh publik. Isu etika AI yang paling relevan di sini adalah...",
        pilihan: ["Plagiarisme", "Ketergantungan AI", "Misinformasi dan Manipulasi", "Hak Cipta"],
        jawaban: "Misinformasi dan Manipulasi",
        penjelasan: "Teknologi deepfake adalah contoh kuat bagaimana AI bisa disalahgunakan untuk membuat konten palsu yang realistis. Ini menimbulkan masalah besar terkait misinformasi, manipulasi opini publik, dan merusak kepercayaan."
    },
    {
        pertanyaan: "AI dapat mengotomatisasi pekerjaan rutin, tapi juga bisa menciptakan pekerjaan baru. Tantangan utama yang harus dihadapi manusia terkait perubahan ini adalah...",
        pilihan: ["Keterbatasan hardware", "Ketidakstabilan koneksi internet", "Kebutuhan untuk upskilling dan reskilling", "Mahalnya biaya listrik"],
        jawaban: "Kebutuhan untuk upskilling dan reskilling",
        penjelasan: "Otomatisasi AI menuntut kita untuk terus belajar dan mengembangkan skill baru yang tidak bisa digantikan oleh mesin (upskilling), atau beralih ke bidang pekerjaan yang sama sekali baru (reskilling) agar tetap relevan di dunia kerja."
    },
    {
        pertanyaan: "Perusahaan A menggunakan AI untuk menyeleksi kandidat karyawan. Namun, AI tersebut secara konsisten menolak kandidat dari kelompok minoritas tertentu karena data yang digunakan bias. Ini adalah contoh dari...",
        pilihan: ["Keamanan data", "Bias sistemik", "Efisiensi rekrutmen", "Plagiarisme"],
        jawaban: "Bias sistemik",
        penjelasan: "Bias sistemik terjadi ketika AI mengambil keputusan yang tidak adil karena bias yang sudah ada dalam data pelatihan. Ini sangat berbahaya dalam konteks rekrutmen atau peradilan."
    },
    {
        pertanyaan: "Mengapa penting bagi developer untuk memahami etika AI sebelum merilis produknya ke publik?",
        pilihan: ["Supaya produknya terlihat lebih canggih", "Untuk mencegah penyalahgunaan dan dampak negatif yang tidak disengaja", "Hanya untuk memenuhi regulasi yang ada", "Agar produknya lebih mahal"],
        jawaban: "Untuk mencegah penyalahgunaan dan dampak negatif yang tidak disengaja",
        penjelasan: "Tanggung jawab etika ada di tangan developer. Memahami dan mengantisipasi dampak negatif AI bisa mencegah kerugian sosial, diskriminasi, dan masalah keamanan yang lebih besar."
    },
    {
        pertanyaan: "Sebuah AI digunakan untuk mendeteksi penyakit langka. Namun, AI tersebut hanya dilatih dengan data dari pasien di negara-negara tertentu. Akibatnya, AI gagal mendiagnosis pasien dari negara lain. Ini menunjukkan masalah...",
        pilihan: ["Privasi data", "Ketergantungan AI", "Generalisasi yang buruk", "Kapasitas server"],
        jawaban: "Generalisasi yang buruk",
        penjelasan: "Generalisasi adalah kemampuan AI untuk beradaptasi dengan data baru yang tidak pernah dilihat sebelumnya. Jika data latihannya tidak beragam, AI akan kesulitan bergeneralisasi dan membuat kesalahan."
    },
    {
        pertanyaan: "Bagaimana cara terbaik untuk mencegah plagiarisme saat menggunakan AI untuk membantu penulisan?",
        pilihan: ["Langsung copy-paste hasilnya", "Mengubah beberapa kata saja", "Menggunakan hasil AI sebagai inspirasi dan menulis ulang dengan gaya sendiri", "Menggunakan AI hanya untuk membuat judul"],
        jawaban: "Menggunakan hasil AI sebagai inspirasi dan menulis ulang dengan gaya sendiri",
        penjelasan: "AI adalah alat bantu, bukan pengganti otak. Cara paling etis adalah menggunakannya untuk brainstorming ide, lalu memprosesnya dan menuliskannya kembali dengan pemikiran dan gaya kita sendiri."
    },
    {
        pertanyaan: "Sebuah AI pengenalan wajah salah mengidentifikasi seseorang sebagai penjahat. Ini merupakan contoh dari...",
        pilihan: ["Bias gender", "False positive", "Hak cipta", "Data overload"],
        jawaban: "False positive",
        penjelasan: "Dalam AI, 'false positive' adalah kesalahan di mana sistem AI secara keliru mengklasifikasikan sesuatu sebagai positif atau benar, padahal sebenarnya tidak. Dalam kasus ini, AI secara keliru mengidentifikasi orang yang tidak bersalah sebagai penjahat, yang bisa menimbulkan konsekuensi serius."
    }
];

const quizContainer = document.getElementById("kuis-container");

if (quizContainer) {
    let userAnswers = [];
    let currentQuestionIndex = 0;
    let questionElement, answerButtonsElement, nextButton, prevButton, submitButton;

    // Fungsi untuk inisialisasi kuis
    function initQuiz() {
        quizContainer.innerHTML = `
            <div id="pertanyaan"></div>
            <div id="pilihan-jawaban"></div>
            <div id="navigasi-kuis">
                <button id="tombol-sebelumnya" class="quiz-nav">Sebelumnya</button>
                <button id="tombol-lanjut" class="quiz-nav">Lanjut</button>
                <button id="tombol-submit" class="quiz-nav">Lihat Hasil</button>
            </div>
        `;
        questionElement = document.getElementById("pertanyaan");
        answerButtonsElement = document.getElementById("pilihan-jawaban");
        nextButton = document.getElementById("tombol-lanjut");
        prevButton = document.getElementById("tombol-sebelumnya");
        submitButton = document.getElementById("tombol-submit");

        userAnswers = Array(quizQuestions.length).fill(null);
        currentQuestionIndex = 0;
        showQuestion();

        prevButton.addEventListener("click", () => {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                showQuestion();
            }
        });

        nextButton.addEventListener("click", () => {
            if (currentQuestionIndex < quizQuestions.length - 1) {
                currentQuestionIndex++;
                showQuestion();
            }
        });

        submitButton.addEventListener("click", showResults);
    }

    // Fungsi untuk menampilkan pertanyaan
    function showQuestion() {
        clearAnswerButtons();
        let currentQuestion = quizQuestions[currentQuestionIndex];
        questionElement.innerHTML = `<p>${currentQuestionIndex + 1}. ${currentQuestion.pertanyaan}</p>`;

        // Mengacak pilihan jawaban
        const shuffledOptions = [...currentQuestion.pilihan];
        for (let i = shuffledOptions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
        }

        shuffledOptions.forEach(option => {
            const button = document.createElement("button");
            button.innerHTML = option;
            button.addEventListener("click", () => selectAnswer(option));
            
            // Tandai jawaban yang sudah dipilih
            if (userAnswers[currentQuestionIndex] === option) {
                button.classList.add("selected");
            }
            answerButtonsElement.appendChild(button);
        });

        // Jika pertanyaan belum dijawab, tombol Lanjut dinonaktifkan
        if (userAnswers[currentQuestionIndex] === null) {
            nextButton.disabled = true;
        }

        // Jika pertanyaan sudah dijawab, tampilkan penjelasan dan nonaktifkan tombol pilihan
        if (userAnswers[currentQuestionIndex] !== null) {
            const explanationText = document.createElement("p");
            explanationText.classList.add("penjelasan-text");
            explanationText.innerHTML = quizQuestions[currentQuestionIndex].penjelasan;
            answerButtonsElement.appendChild(explanationText);

            // Nonaktifkan semua tombol pilihan
            Array.from(answerButtonsElement.children).forEach(button => {
                if (button.tagName === "BUTTON") {
                    button.disabled = true;
                }
            });
            nextButton.disabled = false;
        }
        updateNavButtons();
    }

    // Fungsi saat jawaban dipilih
    function selectAnswer(answer) {
        userAnswers[currentQuestionIndex] = answer;
        Array.from(answerButtonsElement.children).forEach(button => {
            button.classList.remove("selected");
            if (button.innerHTML === answer) {
                button.classList.add("selected");
            }
            button.disabled = true;
        });

        // Tampilkan penjelasan
        const explanationText = document.createElement("p");
        explanationText.classList.add("penjelasan-text");
        explanationText.innerHTML = quizQuestions[currentQuestionIndex].penjelasan;
        answerButtonsElement.appendChild(explanationText);

        nextButton.disabled = false;
        updateNavButtons();
    }

    // Fungsi untuk menghapus tombol jawaban sebelumnya
    function clearAnswerButtons() {
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    }

    // Fungsi untuk memperbarui tombol navigasi
    function updateNavButtons() {
        const allAnswered = userAnswers.every(answer => answer !== null);
        prevButton.disabled = currentQuestionIndex === 0;
        nextButton.style.display = currentQuestionIndex === quizQuestions.length - 1 ? "none" : "inline-block";
        submitButton.style.display = currentQuestionIndex === quizQuestions.length - 1 ? "inline-block" : "none";
        submitButton.disabled = !allAnswered;
    }

    // Fungsi untuk menampilkan hasil kuis
    function showResults() {
        let correctAnswers = userAnswers.filter((answer, index) => answer === quizQuestions[index].jawaban).length;
        
        quizContainer.innerHTML = "";
        quizContainer.innerHTML += `
            <h3>Hasil Kuis</h3>
            <p>Kamu berhasil menjawab <b>${correctAnswers}</b> dari ${quizQuestions.length} pertanyaan dengan benar!</p>
            <p>Berikut adalah hasil koreksi:</p>
        `;

        const resultsList = document.createElement("ul");
        resultsList.classList.add("hasil-kuis");
        quizQuestions.forEach((question, index) => {
            const isCorrect = userAnswers[index] === question.jawaban;
            const userAnswer = userAnswers[index] || "Tidak dijawab";
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <p class="pertanyaan-hasil">${index + 1}. ${question.pertanyaan}</p>
                <p class="jawaban-user ${isCorrect ? "benar" : "salah"}">Jawabanmu: ${userAnswer}</p>
                <p class="jawaban-benar">Jawaban Benar: ${question.jawaban}</p>
            `;
            resultsList.appendChild(listItem);
        });
        quizContainer.appendChild(resultsList);
        
        const navContainer = document.createElement("div");
        navContainer.id = "navigasi-kuis";
        const resetButton = document.createElement("button");
        resetButton.innerHTML = "Mulai Lagi";
        resetButton.classList.add("tombol-lanjut");
        resetButton.addEventListener("click", () => {
            initQuiz();
        });
        navContainer.appendChild(resetButton);
        quizContainer.appendChild(navContainer);
    }
    initQuiz();
}

// ==================== 5. GLOSARIUM INTERAKTIF ====================
const glossaryData = [
    {
        istilah: "Bias Algoritma",
        definisi: "Kecenderungan sistem AI untuk menghasilkan hasil yang tidak adil atau tidak akurat karena data pelatihan yang tidak representatif atau salah."
    },
    {
        istilah: "Deepfake",
        definisi: "Teknik manipulasi media digital yang menggunakan AI untuk menukar atau memodifikasi wajah dan suara dalam video atau audio, seringkali digunakan untuk menyebarkan misinformasi."
    },
    {
        istilah: "Singularitas Teknologi",
        definisi: "Sebuah hipotesis di mana kecerdasan buatan akan melampaui kecerdasan manusia, menyebabkan perubahan peradaban yang tidak dapat dibalikkan."
    },
    {
        istilah: "False Positive (Positif Palsu)",
        definisi: "Kesalahan di mana sistem AI secara keliru mengklasifikasikan sesuatu sebagai positif atau benar, padahal sebenarnya tidak. Contoh: AI pengenalan wajah salah mengidentifikasi orang yang tidak bersalah sebagai penjahat."
    },
    {
        istilah: "Plagiarisme AI",
        definisi: "Tindakan menggunakan konten yang dibuat oleh AI (seperti tulisan atau gambar) tanpa memberikan atribusi yang sesuai, menimbulkan masalah hak cipta dan etika."
    },
    {
        istilah: "Upskilling dan Reskilling",
        definisi: "Proses mempelajari keterampilan baru (upskilling) atau keterampilan yang benar-benar berbeda (reskilling) untuk beradaptasi dengan perubahan pasar kerja akibat otomatisasi AI."
    }
];

const glossaryList = document.getElementById("glosarium-list");

if (glossaryList) {
    glossaryData.forEach(item => {
        const itemContainer = document.createElement("div");
        itemContainer.classList.add("glosarium-item");

        const accordionButton = document.createElement("button");
        accordionButton.classList.add("accordion");
        accordionButton.innerHTML = `<span>${item.istilah}</span>`;
        accordionButton.onclick = function() {
            this.classList.toggle("active");
            const panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        };

        const panel = document.createElement("div");
        panel.classList.add("panel");
        panel.innerHTML = `<p>${item.definisi}</p>`;

        itemContainer.appendChild(accordionButton);
        itemContainer.appendChild(panel);
        glossaryList.appendChild(itemContainer);
    });
}

// ==================== 6. STUDI KASUS INTERAKTIF (Sudah diperbaiki) ====================
const caseStudies = [
    {
        skenario: "Anda adalah developer AI di sebuah perusahaan asuransi. Anda diminta untuk membuat model AI yang memprediksi risiko kesehatan calon nasabah. Setelah model dilatih, Anda menyadari bahwa AI cenderung memberikan premi lebih tinggi kepada nasabah dari daerah tertentu yang memiliki populasi minoritas tinggi. Data pelatihan menunjukkan korelasi ini, tetapi Anda tahu ini bisa dianggap diskriminasi.",
        pilihan: [
            {
                teks: "Luncurkan model tersebut. AI hanya mengikuti data yang ada, dan Anda tidak bisa mengubah fakta.",
                konsekuensi: "Ini adalah pilihan yang berisiko etis tinggi. Meskipun berdasarkan data, model ini dapat dianggap diskriminatif dan merugikan kelompok minoritas. Ini menunjukkan bias algoritmik yang fatal dan dapat merusak reputasi perusahaan."
            },
            {
                teks: "Tolak untuk meluncurkan model tersebut dan minta tim untuk mencari cara menghilangkan bias, meskipun itu akan menunda proyek.",
                konsekuensi: "Ini adalah pilihan yang paling etis dan bertanggung jawab. Meskipun menunda proyek, Anda memprioritaskan keadilan dan menghindari dampak negatif pada masyarakat. Ini menunjukkan kesadaran etika AI yang kuat."
            },
            {
                teks: "Luncurkan model tersebut, tapi tambahkan filter manual untuk memastikan premi tidak terlalu tinggi untuk kelompok tersebut.",
                konsekuensi: "Pilihan ini mencoba mencari jalan tengah, tetapi bisa menjadi solusi yang tidak berkelanjutan. Filter manual mungkin tidak efektif dalam jangka panjang dan bisa menyembunyikan masalah bias yang lebih dalam. Ini juga bisa menimbulkan pertanyaan tentang transparansi AI."
            }
        ]
    }
];

const kasusContainer = document.getElementById("kasus-container");

if (kasusContainer) {
    const skenarioElement = document.getElementById("skenario-kasus");
    const pilihanElement = document.getElementById("pilihan-kasus");
    const currentCase = caseStudies[0];

    // Fungsi untuk merender tampilan awal studi kasus
    function renderKasus() {
        pilihanElement.innerHTML = '';
        skenarioElement.innerHTML = `<p>${currentCase.skenario}</p>`;

        currentCase.pilihan.forEach((pilihan, index) => {
            const button = document.createElement("button");
            button.innerHTML = pilihan.teks;
            button.classList.add("kasus-pilihan");
            button.onclick = () => showKonsekuensi(index);
            pilihanElement.appendChild(button);
        });
    }

    // Fungsi untuk menampilkan konsekuensi dan tombol ulangi
    function showKonsekuensi(pilihanIndex) {
        const allButtons = document.querySelectorAll(".kasus-pilihan");
        allButtons.forEach((button, index) => {
            button.disabled = true;
            if (index === pilihanIndex) {
                button.classList.add("selected");
            }
        });

        const konsekuensiDiv = document.createElement("div");
        konsekuensiDiv.classList.add("konsekuensi");
        konsekuensiDiv.innerHTML = `
            <p><strong>Konsekuensi Pilihan Anda:</strong></p>
            <p>${currentCase.pilihan[pilihanIndex].konsekuensi}</p>
        `;
        pilihanElement.appendChild(konsekuensiDiv);

        const resetButton = document.createElement("button");
        resetButton.textContent = 'Ulangi Skenario';
        resetButton.classList.add('reset-button');
        resetButton.onclick = renderKasus;
        pilihanElement.appendChild(resetButton);
    }

    // Panggil fungsi render awal saat halaman dimuat
    renderKasus();
}