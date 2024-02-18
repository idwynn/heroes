$(document).ready(function () {
  $("#formulario").on("submit", function (numero) {
    let num = parseInt($("#searchHero").val());
    numero.preventDefault();
    $("#busqueda").html("");
    $("#searchHero").val("");
    $("#chartContainer").html("");

    verificar(num);
  });
});

function verificar(number) {
  let solonumero = /^[0-9]+$/;
  if (solonumero.test(number)) {
    $.ajax({
      datatype: "json",
      method: "GET",
      url: `https://superheroapi.com/api.php/4905856019427443/${number}`,
      success: function (busqueda) {
        if (busqueda.response === "success") {
          let heroe = `
          <center>
<h3>Super Heroe Encontrado</h3>
    <div class="card">
      <div class="row">
        <div class="col-md-4">
          <img src="${busqueda.image.url}" class="card-img" alt="" />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">Nombre: ${busqueda.name} </h5>
            <p class="card-text">
              Conexiones:${busqueda.connections["group-affiliation"]}
            </p>
            <ul class="list-group">
              <li class="list-group-item">
                <em>Publicador</em>: ${busqueda.biography.publisher}
              </li>
              <li class="list-group-item">
                <em>Ocupación: ${busqueda.work.occupation} </em>
              </li>
              <li class="list-group-item">
                <em
                  >Primera vez que aparece:
                  ${busqueda.biography["first-appearance"]}</em
                >
              </li>
              <li class="list-group-item">
                <em>Altura: ${busqueda.appearance.height.join(" - ")} </em>
              </li>
              <li class="list-group-item">
                <em>Peso: ${busqueda.appearance.weight.join(" - ")} </em>
              </li>
              <li class="list-group-item">
                <em>Alias:  ${busqueda.biography.aliases}</em>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </center>
        `;
          $("#busqueda").append(heroe);

          let arraydatos = [];
          for (let key in busqueda.powerstats) {
            arraydatos.push({ x: key, y: parseInt(busqueda.powerstats[key]) });
          }

          let option = {
            title: { text: `Estadisticas de poder del heroe ${busqueda.name}` },
            data: [{
                type: "pie",
                startAngle: 45,
                showInLegend: "true",
                legendText: "{label}",
                indexLabel: "{lavel} ({y})",
                yValueFormatString: "#, ##0.#" % "",
                dataPoints: arraydatos,
            },],
          }; $("#chartContainer").CanvasJSChart(option);
        } 
      },
    });
  } else {
    alert("Ingrese un numero valido");
  }
}
