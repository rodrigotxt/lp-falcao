    function atualizarCronometro(elementId) {
      const elemento = document.getElementById(elementId);
      if(!elemento) return;
      const horasAttr = elemento.getAttribute("hours");

      // Converte string do atributo para array
      const horarios = JSON.parse(horasAttr.replace(/'/g, '"')); // ['13:00', '20:00'] -> ["13:00", "20:00"]

      const agora = new Date();
      const agoraBRT = new Date(agora.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));

      // Gera as próximas datas com base nos horários informados
      const proximasLives = horarios.map(horaStr => {
        const [h, m] = horaStr.split(":").map(Number);
        const data = new Date(agoraBRT);
        data.setHours(h, m, 0, 0);
        if (data <= agoraBRT) data.setDate(data.getDate() + 1); // se já passou hoje, pega amanhã
        return data;
      });

      // Encontra a mais próxima
      const proximaLive = proximasLives.sort((a, b) => a - b)[0];
      const diffMs = proximaLive - agoraBRT;

      const horas = Math.floor(diffMs / 1000 / 60 / 60);
      const minutos = Math.floor((diffMs / 1000 / 60) % 60);
      const segundos = Math.floor((diffMs / 1000) % 60);

      const horaFormatada = String(horas).padStart(2, "0");
      const minutoFormatado = String(minutos).padStart(2, "0");
      const segundoFormatado = String(segundos).padStart(2, "0");

      const horaAlvo = `${String(proximaLive.getHours()).padStart(2, '0')}`;

      const mensagem = `Falta <span class="tempo">${horaFormatada}:${minutoFormatado}:${segundoFormatado}</span> para live das <span class="hora-alvo">${horaAlvo}h</span> (horário de Brasília)`;

      elemento.innerHTML = mensagem;
      setInterval(() => atualizarCronometro(elementId), 1000);
    }