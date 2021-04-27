navigator.serviceWorker &&
  navigator.serviceWorker.register("./sw.js").then(function (registration) {
    console.log("Excellent, registered with scope: ", registration.scope);
  });

initMap();

function initMap() {
  $.get("https://hpb.health.gov.lk/api/get-current-statistical", function (data) {
    let updated = data["data"]["update_date_time"];
    updated = updated.replace(" ", "<br>");
    //set the home page values
    $("#local-cases").html(numberWithCommas(data["data"]["local_total_cases"]));
    $("#local-recovered").html(numberWithCommas(data["data"]["local_recovered"]));
    $("#local-deaths").html(numberWithCommas(data["data"]["local_deaths"]));
    $("#active-cases").html(numberWithCommas(data["data"]["local_active_cases"]));
    $("#pcr-count").html(numberWithCommas(data["data"]["total_pcr_testing_count"]));
    $("#in-observ").html(numberWithCommas(data["data"]["local_total_number_of_individuals_in_hospitals"]));

    $("#new-cases").html(data["data"]["local_new_cases"]);
    $("#new-deaths").html(data["data"]["local_new_deaths"]);
    $("#global-total").html(data["data"]["global_total_cases"]);
    $("#last-updated").html(updated);

    //draw the doghnut chart
    drawDoughnut([data["data"]["local_active_cases"], data["data"]["local_recovered"], data["data"]["local_deaths"]]);

    console.log(data);
  });
}
//generatess a timeseries graoh using a public dataset
function drawGreenChart(processedData, ctxID) {
  var timeFormat = "YYYY-MM-DD";
  //canvas
  var ctx = document.getElementById(ctxID).getContext("2d");

  //gradient
  var gradientFill = ctx.createLinearGradient(0, 0, 0, 200);
  gradientFill.addColorStop(0, "rgba(0, 196, 0, 1)");
  gradientFill.addColorStop(0.1, "rgba(0, 90, 0, 1)");
  gradientFill.addColorStop(1, "rgba(0, 0, 0, 0.6)");

  var config = {
    type: "line",
    data: {
      datasets: [
        {
          label: "Recovered",
          data: processedData,
          fill: true,
          backgroundColor: gradientFill,
          borderColor: "#00ff00",
          pointBorderColor: "#00ff00",
          pointBackgroundColor: "#00ff00",
          pointHoverBackgroundColor: "#00ff00",
          pointHoverBorderColor: "#00ff00",
          pointHoverRadius: 2,
          pointHoverBorderWidth: 1,
        },
      ],
    },
    options: {
      legend: {
        display: false,
      },
      elements: {
        line: {
          tension: 0,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            type: "time",
            time: {
              format: timeFormat,
              tooltipFormat: "ll",
            },
            scaleLabel: {
              display: true,
              labelString: "Date",
            },
          },
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "value",
            },
          },
        ],
      },
    },
  };

  window.myLine = new Chart(ctx, config);
} //end function

//generatess a timeseries graoh using a public dataset
function drawWhiteChart(processedData, ctxID) {
  var timeFormat = "YYYY-MM-DD";
  //canvas
  var ctx = document.getElementById(ctxID).getContext("2d");

  //gradient
  var gradientFill = ctx.createLinearGradient(0, 0, 0, 200);
  gradientFill.addColorStop(0, "rgba(0, 196, 0, 1)");
  gradientFill.addColorStop(0.1, "rgba(0, 90, 0, 1)");
  gradientFill.addColorStop(1, "rgba(0, 0, 0, 0.6)");

  var config = {
    type: "line",
    data: {
      datasets: [
        {
          label: "Recovered",
          data: processedData,
          fill: true,
          backgroundColor: gradientFill,
          borderColor: "#00ff00",
          pointBorderColor: "#00ff00",
          pointBackgroundColor: "#00ff00",
          pointHoverBackgroundColor: "#00ff00",
          pointHoverBorderColor: "#00ff00",
          pointHoverRadius: 2,
          pointHoverBorderWidth: 1,
        },
      ],
    },
    options: {
      legend: {
        display: false,
      },
      elements: {
        line: {
          tension: 0,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            type: "time",
            time: {
              format: timeFormat,
              tooltipFormat: "ll",
            },
            scaleLabel: {
              display: true,
              labelString: "Date",
            },
          },
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "value",
            },
          },
        ],
      },
    },
  };

  window.myLine = new Chart(ctx, config);
} //end function

//generatess a timeseries graoh using a public dataset
function drawBlueChart(processedData) {
  var ctx = document.getElementById("new-cases-chart").getContext("2d");
  var myBarChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: processedData["x"],
      datasets: [
        {
          label: "Daily New Cases",
          data: processedData["y"],
          backgroundColor: "#00f",
          borderWidth: 0,
        },
      ],
    },
    options: {
      legend: {
        display: false,
      },
      maintainAspectRatio: false,
      tooltips: {
        enabled: false,
      },
      responsive: true,
      scales: {
        xAxes: [
          {
            barThickness: 3,
            maxBarThickness: 3,
            barPercentage: 0.3,
            type: "time",
            time: {
              format: "YYYY-MM-DD",
              tooltipFormat: "ll",
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
} //end function

//generatess a timeseries graoh using a public dataset
function drawChart(processedData, ctxID) {
  var timeFormat = "YYYY-MM-DD";
  //canvas
  var ctx = document.getElementById(ctxID).getContext("2d");
  //gradient
  var gradientFill = ctx.createLinearGradient(0, 0, 0, 350);
  gradientFill.addColorStop(0, "rgba(196, 0, 0, 1)");
  gradientFill.addColorStop(0.1, "rgba(90, 0, 0, 1)");
  gradientFill.addColorStop(1, "rgba(0, 0, 0, 0.6)");

  var config = {
    type: "line",
    data: {
      datasets: [
        {
          label: "Total Cases",
          data: processedData,
          fill: true,
          backgroundColor: gradientFill,
          borderColor: "#ff0000",
          pointBorderColor: "#ff0000",
          pointBackgroundColor: "#ff0000",
          pointHoverBackgroundColor: "#ff0000",
          pointHoverBorderColor: "#ff0000",
          pointHoverRadius: 2,
          pointHoverBorderWidth: 1,
        },
      ],
    },
    options: {
      legend: {
        display: false,
      },
      elements: {
        line: {
          tension: 0,
        },
      },
      responsive: true,
      title: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            type: "time",
            time: {
              displayFormats: {
                day: "MMM D",
              },
              tooltipFormat: "ll",
            },
            scaleLabel: {
              display: true,
              labelString: "Date",
            },
          },
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "value",
            },
          },
        ],
      },
    },
  };

  window.myLine = new Chart(ctx, config);
} //end function

function drawDoughnut(processedData) {
  var ctx = document.getElementById("pie-chart").getContext("2d");
  data = {
    datasets: [
      {
        data: processedData,
        backgroundColor: ["rgba(0, 0, 255, 0.1)", "rgba(0, 255, 0, 0.1)", "rgba(255, 0, 0, 0.1)"],
        borderColor: ["#00f", "#0f0", "#f00"],
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ["Active", "Recovered", "Deaths"],
  };
  // doughnut chart
  var myDoughnutChart = new Chart(ctx, {
    type: "doughnut",
    data: data,
    options: {
      legend: {
        position: "bottom",
      },
    },
  });
}

window.onload = function () {
  var proData = [];
  var proRecoveredData = [];
  var previousDay = {};
  var newcases = { x: [], y: [] };
  fetch("https://pomber.github.io/covid19/timeseries.json")
    .then((response) => response.json())
    .then((data) => {
      data["Sri Lanka"].forEach((day) => {
        //to fix a glitch in the data API. Don't know what went rong
        if (previousDay["recovered"] >= day["recovered"]) {
          recovered = previousDay["recovered"];
        } else {
          recovered = day["recovered"];
        }
        //temporary variable
        d2 = moment(day["date"], "YYYY-MM-DD");
        if (d2.isAfter("2020-03-07")) {
          //total cases
          proData.push({
            x: moment(day["date"], "YYYY-MM-DD"),
            y: day["confirmed"],
          });
          //recovered
          proRecoveredData.push({
            x: moment(day["date"], "YYYY-MM-DD"),
            y: recovered,
          });
          //new cases
          if (day["confirmed"] - previousDay["confirmed"] >= 0) {
            newcases["x"].push(moment(day["date"], "YYYY-MM-DD"));
            newcases["y"].push(day["confirmed"] - previousDay["confirmed"]);
          }
        }
        previousDay = day;
      }); //end foreach

      drawChart(proData, "total-cases-graph");
      drawGreenChart(proRecoveredData, "recovered-graph");
      drawBlueChart(newcases);
    })
    .catch((e) => {
      console.log(e);
    });
};

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, `<span style="font-size: 25px">,</span>`);
}
