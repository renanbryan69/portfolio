const subjects = [
    "Programação Front-End",
    "Programação Back-End",
    "Versionamento de Códigos",
    "Inteligência Artificial",
    "Projeto Multidisciplinar",
    "Modelagem de Banco de Dados",
    "Programação Mobile"
];


/* =========================
   SEMANAS DE CADA MATÉRIA
========================= */

const subjectWeeks = {
    "Programação Front-End": 21,
    "Programação Back-End": 21,
    "Versionamento de Códigos": 20,
    "Inteligência Artificial": 20,
    "Projeto Multidisciplinar": 21,
    "Modelagem de Banco de Dados": 21,
    "Programação Mobile": 21
};


/* =========================
   CRIAR SEMANAS VAZIAS
========================= */

function criarSemanasVazias() {

    return Array.from(
        { length: 7 },
        (_, i) => ({
            number: i + 15,
            status: "VAZIO",
            description: "",
            github: ""
        })
    );

}


/* =========================
   DADOS PADRÃO
========================= */

const defaultData = {

    student: {
        name: "Renan Bryan",
        ra: "0000114507800x SP"
    },

    selectedSubject:
        "Programação Front-End",

    // Cada matéria possui suas próprias semanas
    weeks: {}

};


/* =========================
   INICIALIZA AS MATÉRIAS
========================= */

subjects.forEach(subject => {

    defaultData.weeks[subject] =
        criarSemanasVazias();

});


/* =========================
   CARREGAR DADOS
========================= */

let data =
    JSON.parse(
        localStorage.getItem(
            "portfolioData"
        )
    ) || defaultData;


/* =========================
   CONVERTER FORMATO ANTIGO
=========================

Se o site antigo tinha apenas:

data.weeks = [...]

as atividades antigas serão
colocadas somente na matéria
que estava selecionada.
*/

if (Array.isArray(data.weeks)) {

    const semanasAntigas =
        data.weeks;

    data.weeks = {};

    subjects.forEach(subject => {

        data.weeks[subject] =
            criarSemanasVazias();

    });


    const materiaAntiga =
        subjects.includes(
            data.selectedSubject
        )
            ? data.selectedSubject
            : "Programação Front-End";


    data.weeks[materiaAntiga] =
        semanasAntigas;

}


/* =========================
   GARANTE QUE TODAS AS
   MATÉRIAS TENHAM SEMANAS
========================= */

subjects.forEach(subject => {

    if (
        !Array.isArray(
            data.weeks[subject]
        )
    ) {

        data.weeks[subject] =
            criarSemanasVazias();

    }

});


/* =========================
   GARANTE QUE TODAS AS
   SEMANAS TENHAM CAMPO GITHUB
========================= */

subjects.forEach(subject => {

    data.weeks[subject].forEach(week => {

        if (
            typeof week.github === "undefined"
        ) {

            week.github = "";

        }

    });

});


/* =========================
   VARIÁVEL DE EDIÇÃO
========================= */

let editingWeek = null;


/* =========================
   SALVAR NO NAVEGADOR
========================= */

function salvarLocal() {

    localStorage.setItem(
        "portfolioData",
        JSON.stringify(data)
    );

}


/* =========================
   PEGAR SEMANAS DA MATÉRIA
========================= */

function getCurrentWeeks() {

    if (
        !Array.isArray(
            data.weeks[
                data.selectedSubject
            ]
        )
    ) {

        data.weeks[
            data.selectedSubject
        ] =
            criarSemanasVazias();

    }


    return data.weeks[
        data.selectedSubject
    ];

}


/* =========================
   LOGIN
========================= */

function entrar() {

    const nome =
        document
        .getElementById("loginName")
        .value
        .trim();


    if (nome) {

        data.student.name =
            nome;

        salvarLocal();

    }


    document
        .getElementById("loginScreen")
        .classList
        .add("hidden");


    document
        .getElementById("app")
        .classList
        .remove("hidden");


    render();

}


/* =========================
   SAIR
========================= */

function sair() {

    document
        .getElementById("app")
        .classList
        .add("hidden");


    document
        .getElementById("loginScreen")
        .classList
        .remove("hidden");

}


/* =========================
   RENDERIZAR
========================= */

function render() {

    document
        .getElementById("studentName")
        .textContent =
        data.student.name;


    const pageTitle =
        document.getElementById(
            "pageTitle"
        );


    if (pageTitle) {

        pageTitle.textContent =
            "Portfólio Geral 3º Bimestre: " +
            data.selectedSubject;

    }


    renderSubjects();

    renderWeeks();

}


/* =========================
   DISCIPLINAS
========================= */

function renderSubjects() {

    const container =
        document.getElementById(
            "subjects"
        );


    container.innerHTML = "";


    subjects.forEach(subject => {

        const div =
            document.createElement(
                "div"
            );


        div.className =
            "subject";


        /* =========================
           MATÉRIA SELECIONADA
        ========================= */

        if (
            subject ===
            data.selectedSubject
        ) {

            div.classList.add(
                "active"
            );

        }


        div.textContent =
            subject;


        /* =========================
           CLICAR NA MATÉRIA
        ========================= */

        div.onclick = () => {

            data.selectedSubject =
                subject;


            editingWeek = null;


            salvarLocal();


            const pageTitle =
                document.getElementById(
                    "pageTitle"
                );


            if (pageTitle) {

                pageTitle.textContent =
                    "Portfólio Geral 3º Bimestre: " +
                    subject;

            }


            renderSubjects();

            renderWeeks();

        };


        container.appendChild(div);

    });

}


/* =========================
   SEMANAS
========================= */

function renderWeeks() {

    const container =
        document.getElementById(
            "weeks"
        );


    container.innerHTML = "";


    const ultimaSemana =
        subjectWeeks[
            data.selectedSubject
        ] || 21;


    /* =========================
       PEGAR SEMANAS DA MATÉRIA
       ATUAL
    ========================= */

    const weeks =
        getCurrentWeeks();


    weeks.forEach(
        (week, index) => {


            /* =========================
               NÃO MOSTRAR SEMANAS
               ACIMA DO LIMITE
            ========================= */

            if (
                week.number >
                ultimaSemana
            ) {

                return;

            }


            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "week-card";


            /* =========================
               STATUS
            ========================= */

            let statusClass =
                "vazio";


            if (
                week.status ===
                "CONCLUÍDO"
            ) {

                statusClass =
                    "concluido";

            }


            if (
                week.status ===
                "EM ANDAMENTO"
            ) {

                statusClass =
                    "andamento";

            }


            /* =========================
               DESCRIÇÃO
            ========================= */

            const description =
                week.description ||
                "Clique para adicionar seu registro...";


            /* =========================
               LINK DO GITHUB
            ========================= */

            let githubHtml = "";


            if (week.github) {

                githubHtml = `
                    <p class="github-link">
                        <a
                            href="${escapeAttribute(week.github)}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            ${escapeHtml(week.github)}
                        </a>
                    </p>
                `;

            }


            /* =========================
               CARD
            ========================= */

            card.innerHTML = `

                <div>

                    <div class="week-top">

                        <h2>
                            Semana ${week.number}
                        </h2>

                        <span
                            class="status ${statusClass}"
                        >
                            ${week.status}
                        </span>

                    </div>


                    <p class="description">
                        ${escapeHtml(
                            description
                        )}
                    </p>


                    ${githubHtml}

                </div>


                <button
                    class="edit"
                    onclick="abrirModal(${index})"
                >
                    Editar
                </button>

            `;


            container.appendChild(card);

        }
    );

}


/* =========================
   ABRIR EDIÇÃO
========================= */

function abrirModal(index) {

    editingWeek =
        index;


    const weeks =
        getCurrentWeeks();


    const week =
        weeks[index];


    document
        .getElementById(
            "modalTitle"
        )
        .textContent =
        `Editar Semana ${week.number}`;


    document
        .getElementById(
            "weekDescription"
        )
        .value =
        week.description || "";


    /* =========================
       CARREGAR LINK DO GITHUB
    ========================= */

    document
        .getElementById(
            "weekGithub"
        )
        .value =
        week.github || "";


    document
        .getElementById(
            "weekStatus"
        )
        .value =
        week.status;


    document
        .getElementById("modal")
        .classList
        .remove("hidden");

}


/* =========================
   FECHAR MODAL
========================= */

function fecharModal() {

    editingWeek =
        null;


    document
        .getElementById("modal")
        .classList
        .add("hidden");

}


/* =========================
   SALVAR SEMANA
========================= */

function salvarSemana() {

    if (
        editingWeek ===
        null
    ) {

        return;

    }


    const weeks =
        getCurrentWeeks();


    /* =========================
       SALVAR DESCRIÇÃO
    ========================= */

    weeks[
        editingWeek
    ].description =

        document
        .getElementById(
            "weekDescription"
        )
        .value
        .trim();


    /* =========================
       SALVAR LINK DO GITHUB
    ========================= */

    weeks[
        editingWeek
    ].github =

        document
        .getElementById(
            "weekGithub"
        )
        .value
        .trim();


    /* =========================
       SALVAR STATUS
    ========================= */

    weeks[
        editingWeek
    ].status =

        document
        .getElementById(
            "weekStatus"
        )
        .value;


    /* =========================
       SALVAR TUDO NO LOCALSTORAGE
    ========================= */

    salvarLocal();


    fecharModal();


    renderWeeks();

}


/* =========================
   EXPORTAR BACKUP
========================= */

function exportarBackup() {

    salvarLocal();


    const backup = {

        version: 3,

        exportedAt:
            new Date().toISOString(),

        data: data

    };


    const blob =
        new Blob(

            [
                JSON.stringify(
                    backup,
                    null,
                    2
                )
            ],

            {
                type:
                    "application/json"
            }

        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;


    link.download =
        "backup-portfolio.json";


    link.click();


    URL.revokeObjectURL(
        url
    );


    alert(
        "Backup salvo com sucesso! " +
        "Envie o arquivo backup-portfolio.json " +
        "junto com o site."
    );

}


/* =========================
   IMPORTAR BACKUP
========================= */

function importarBackup(event) {

    const file =
        event.target.files[0];


    if (!file) {

        return;

    }


    const reader =
        new FileReader();


    reader.onload =
        function(event) {

            try {

                const backup =
                    JSON.parse(
                        event.target.result
                    );


                data =
                    backup.data ||
                    backup;


                /* =========================
                   CONVERTER BACKUP ANTIGO
                ========================= */

                if (
                    Array.isArray(
                        data.weeks
                    )
                ) {

                    const semanasAntigas =
                        data.weeks;


                    data.weeks = {};


                    subjects.forEach(
                        subject => {

                            data.weeks[
                                subject
                            ] =
                                criarSemanasVazias();

                        }
                    );


                    const materia =
                        subjects.includes(
                            data.selectedSubject
                        )
                            ? data.selectedSubject
                            : "Programação Front-End";


                    data.weeks[
                        materia
                    ] =
                        semanasAntigas;

                }


                /* =========================
                   GARANTIR TODAS AS MATÉRIAS
                ========================= */

                subjects.forEach(
                    subject => {

                        if (
                            !Array.isArray(
                                data.weeks[
                                    subject
                                ]
                            )
                        ) {

                            data.weeks[
                                subject
                            ] =
                                criarSemanasVazias();

                        }

                    }
                );


                /* =========================
                   GARANTIR CAMPO GITHUB
                ========================= */

                subjects.forEach(
                    subject => {

                        data.weeks[
                            subject
                        ].forEach(
                            week => {

                                if (
                                    typeof week.github === "undefined"
                                ) {

                                    week.github = "";

                                }

                            }
                        );

                    }
                );


                salvarLocal();


                render();


                alert(
                    "Backup importado com sucesso!"
                );


            } catch {

                alert(
                    "Não foi possível ler " +
                    "esse arquivo de backup."
                );

            }

        };


    reader.readAsText(
        file
    );

}


/* =========================
   PROTEÇÃO DO TEXTO
========================= */

function escapeHtml(text) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text;


    return div.innerHTML;

}


/* =========================
   PROTEÇÃO DO LINK
========================= */

function escapeAttribute(text) {

    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

}


/* =========================
   ABRIR AUTOMATICAMENTE
========================= */

if (
    localStorage.getItem(
        "portfolioData"
    )
) {

    document
        .getElementById(
            "loginScreen"
        )
        .classList
        .add("hidden");


    document
        .getElementById(
            "app"
        )
        .classList
        .remove("hidden");


    render();

}