document.addEventListener("DOMContentLoaded", function() {

    // ==================================================
    // NÚMERO DO WHATSAPP
    // ==================================================

    const numeroWhatsApp = "5581987777405";


    // ==================================================
    // CARROSSEL DE VÍDEOS
    // ==================================================

    const slidesVideos = document.querySelectorAll(".slide-video");
    const indicadoresVideos = document.querySelectorAll(".indicador-video");
    const botaoVoltarVideo = document.querySelector(".botao-voltar-video");
    const botaoAvancarVideo = document.querySelector(".botao-avancar-video");

    let indiceVideoAtual = 0;

    function pausarTodosOsVideos() {
        slidesVideos.forEach(function(slide) {
            const video = slide.querySelector("video");

            if (video) {
                video.pause();
            }
        });
    }

    function mostrarVideo(indice) {
        if (slidesVideos.length === 0) {
            return;
        }

        pausarTodosOsVideos();

        slidesVideos.forEach(function(slide) {
            slide.classList.remove("ativo");
        });

        indicadoresVideos.forEach(function(indicador) {
            indicador.classList.remove("ativo");
        });

        indiceVideoAtual = indice;

        if (indiceVideoAtual < 0) {
            indiceVideoAtual = slidesVideos.length - 1;
        }

        if (indiceVideoAtual >= slidesVideos.length) {
            indiceVideoAtual = 0;
        }

        slidesVideos[indiceVideoAtual].classList.add("ativo");

        if (indicadoresVideos[indiceVideoAtual]) {
            indicadoresVideos[indiceVideoAtual].classList.add("ativo");
        }
    }

    if (botaoVoltarVideo) {
        botaoVoltarVideo.addEventListener("click", function() {
            mostrarVideo(indiceVideoAtual - 1);
        });
    }

    if (botaoAvancarVideo) {
        botaoAvancarVideo.addEventListener("click", function() {
            mostrarVideo(indiceVideoAtual + 1);
        });
    }

    indicadoresVideos.forEach(function(indicador) {
        indicador.addEventListener("click", function() {
            const indice = Number(indicador.dataset.video);

            mostrarVideo(indice);
        });
    });

    mostrarVideo(0);


    // ==================================================
    // CARROSSEL DE IMAGENS
    // ==================================================

    const slidesImagens = document.querySelectorAll(".slide-imagem");
    const indicadoresImagens = document.querySelectorAll(".indicador-imagem");
    const botaoVoltarImagem = document.querySelector(".botao-voltar-imagem");
    const botaoAvancarImagem = document.querySelector(".botao-avancar-imagem");

    let indiceImagemAtual = 0;

    function mostrarImagem(indice) {
        if (slidesImagens.length === 0) {
            return;
        }

        slidesImagens.forEach(function(slide) {
            slide.classList.remove("ativo");
        });

        indicadoresImagens.forEach(function(indicador) {
            indicador.classList.remove("ativo");
        });

        indiceImagemAtual = indice;

        if (indiceImagemAtual < 0) {
            indiceImagemAtual = slidesImagens.length - 1;
        }

        if (indiceImagemAtual >= slidesImagens.length) {
            indiceImagemAtual = 0;
        }

        slidesImagens[indiceImagemAtual].classList.add("ativo");

        if (indicadoresImagens[indiceImagemAtual]) {
            indicadoresImagens[indiceImagemAtual].classList.add("ativo");
        }
    }

    if (botaoVoltarImagem) {
        botaoVoltarImagem.addEventListener("click", function() {
            mostrarImagem(indiceImagemAtual - 1);
        });
    }

    if (botaoAvancarImagem) {
        botaoAvancarImagem.addEventListener("click", function() {
            mostrarImagem(indiceImagemAtual + 1);
        });
    }

    indicadoresImagens.forEach(function(indicador) {
        indicador.addEventListener("click", function() {
            const indice = Number(indicador.dataset.imagem);

            mostrarImagem(indice);
        });
    });

    mostrarImagem(0);


    // ==================================================
    // TROCA AUTOMÁTICA DAS IMAGENS
    // ==================================================

    let intervaloImagens = setInterval(function() {
        mostrarImagem(indiceImagemAtual + 1);
    }, 5000);

    const carrosselImagens = document.querySelector(".carrossel-imagens");

    if (carrosselImagens) {
        carrosselImagens.addEventListener("mouseenter", function() {
            clearInterval(intervaloImagens);
        });

        carrosselImagens.addEventListener("mouseleave", function() {
            intervaloImagens = setInterval(function() {
                mostrarImagem(indiceImagemAtual + 1);
            }, 5000);
        });
    }


    // ==================================================
    // MÁSCARA DO TELEFONE
    // ==================================================

    const campoTelefone = document.getElementById("telefone");

    if (campoTelefone) {
        campoTelefone.addEventListener("input", function() {
            let numero = campoTelefone.value.replace(/\D/g, "");

            numero = numero.substring(0, 11);

            if (numero.length > 10) {
                numero = numero.replace(
                    /^(\d{2})(\d{5})(\d{4})$/,
                    "($1) $2-$3"
                );
            } else if (numero.length > 6) {
                numero = numero.replace(
                    /^(\d{2})(\d{4})(\d{0,4})$/,
                    "($1) $2-$3"
                );
            } else if (numero.length > 2) {
                numero = numero.replace(
                    /^(\d{2})(\d{0,5})$/,
                    "($1) $2"
                );
            } else if (numero.length > 0) {
                numero = numero.replace(
                    /^(\d{0,2})$/,
                    "($1"
                );
            }

            campoTelefone.value = numero;
        });
    }


    // ==================================================
    // FORMULÁRIO PARA O WHATSAPP
    // ==================================================

    const formulario = document.getElementById("formulario-orcamento");

    if (formulario) {
        formulario.addEventListener("submit", function(evento) {
            evento.preventDefault();

            const nome = document.getElementById("nome").value.trim();
            const telefone = document.getElementById("telefone").value.trim();
            const cidade = document.getElementById("cidade").value.trim();
            const descricao = document.getElementById("descricao").value.trim();

            const tiposSelecionados = Array.from(
                document.querySelectorAll('input[name="tipo"]:checked')
            ).map(function(campo) {
                return campo.value;
            });

            const servicosSelecionados = Array.from(
                document.querySelectorAll('input[name="servico"]:checked')
            ).map(function(campo) {
                return campo.value;
            });

            const horarioSelecionado = document.querySelector(
                'input[name="horario"]:checked'
            );

            if (tiposSelecionados.length === 0) {
                alert("Marque pelo menos um tipo de instalação.");
                return;
            }

            if (servicosSelecionados.length === 0) {
                alert("Marque pelo menos um serviço.");
                return;
            }

            if (!horarioSelecionado) {
                alert("Escolha o melhor horário para contato.");
                return;
            }

            const tiposTexto = tiposSelecionados.join(", ");
            const servicosTexto = servicosSelecionados.join(", ");
            const horarioTexto = horarioSelecionado.value;

            const mensagem =
                "Olá! Gostaria de solicitar um orçamento." +
                "\n\n" +
                "Nome: " + nome +
                "\n" +
                "Telefone: " + telefone +
                "\n" +
                "Cidade: " + cidade +
                "\n\n" +
                "Tipo de instalação: " + tiposTexto +
                "\n\n" +
                "Serviços desejados: " + servicosTexto +
                "\n\n" +
                "Melhor horário para contato: " + horarioTexto +
                "\n\n" +
                "Descrição do serviço:" +
                "\n" +
                descricao;

            const mensagemCodificada = encodeURIComponent(mensagem);

            const linkWhatsApp =
                "https://wa.me/" +
                numeroWhatsApp +
                "?text=" +
                mensagemCodificada;

            window.open(linkWhatsApp, "_blank");
        });
    }


    // ==================================================
    // MENU COM ROLAGEM SUAVE
    // ==================================================

    const linksInternos = document.querySelectorAll('a[href^="#"]');

    linksInternos.forEach(function(link) {
        link.addEventListener("click", function(evento) {
            const destino = link.getAttribute("href");

            if (!destino || destino === "#") {
                return;
            }

            const elementoDestino = document.querySelector(destino);

            if (elementoDestino) {
                evento.preventDefault();

                elementoDestino.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    // ==================================================
    // SERVIÇOS LATERAIS
    // FECHA OS OUTROS QUANDO UM FOR ABERTO
    // ==================================================

    const detalhesServicos = document.querySelectorAll(".item-servico");

    detalhesServicos.forEach(function(detalheAtual) {
        detalheAtual.addEventListener("toggle", function() {
            if (!detalheAtual.open) {
                return;
            }

            detalhesServicos.forEach(function(outroDetalhe) {
                if (outroDetalhe !== detalheAtual) {
                    outroDetalhe.removeAttribute("open");
                }
            });
        });
    });

});