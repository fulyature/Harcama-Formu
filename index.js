const inputGelir = document.getElementById("gelir-giris");
const btnEkle = document.getElementById("btn-ekle");
const geliriniz = document.getElementById("gelir-total");
const harcamaTuru = document.getElementById("harcama-turu");
const toplamGider = document.getElementById("gider-total");
const kaydet = document.getElementById("kaydet");
const form = document.querySelector("form");
const kalan = document.getElementById("kalan");
const resetButton = document.getElementById("reset-btn");
let gelirler = [];
let giderler = [];
let totalGelir = 0;

//?Event

const harcamaSatiriGenerator = (event) => {
  event.preventDefault();
  const gider = document.getElementById("harcama-giris")?.value;
  const harcamaYeri = harcamaTuru?.value;
  const harcamaTarihi = document.querySelector("input[type=date]")?.value;
  giderler.push(Number(gider));
  const tableRow = document.createElement("tr");

  //Excell dekı hucre gıbı
  const giderTD = document.createElement("td");
  giderTD.textContent = Number(gider).toLocaleString("tr-TR", {
    style: "currency",
    currency: "TRY",
  });
  const harcamaYeriTD = document.createElement("td");
  harcamaYeriTD.textContent = harcamaYeri;

  const HarcamaTarihiTD = document.createElement("td");
  HarcamaTarihiTD.textContent = harcamaTarihi;

  const deleteIcon = document.createElement("td");
  deleteIcon.textContent = "Sil";
  deleteIcon.setAttribute("class", "delete-icon");

  tableRow.setAttribute("class", "footer-col");
  tableRow.appendChild(giderTD);
  tableRow.appendChild(harcamaYeriTD);
  tableRow.appendChild(HarcamaTarihiTD);
  tableRow.appendChild(deleteIcon);
  setTotalGider();
  document.getElementById("sonuc-body").appendChild(tableRow);
  deleteIcon.addEventListener("click", () =>
    document.getElementById("sonuc-body").removeChild(deleteIcon.parentElement)
  );

  gider.value = null;
  harcamaYeri.value = "";
  harcamaTarihi.value = "";
};

form.addEventListener("submit", harcamaSatiriGenerator);
btnEkle.addEventListener("click", () => {
  if (inputGelir?.value != "") {
    gelir();
    inputGelir.value = "";
    inputGelir.focus();
  }
});

//fonksiyonlar
const gelir = () => {
  gelirler.push(Number(inputGelir.value));
  totalGelir = gelirler.reduce((a, i) => a + i, 0);
  const total_gider = giderler.reduce((a, i) => a + i, 0);

  geliriniz.value = Number(totalGelir).toLocaleString("tr-TR", {
    style: "currency",
    currency: "TRY",
  });

  kalan.value = Number(totalGelir - total_gider).toLocaleString("tr-TR", {
    style: "currency",
    currency: "TRY",
  });
};

const setTotalGider = () => {
  const total_gider = giderler.reduce((a, i) => a + i, 0);
  totalGelir = gelirler.reduce((a, i) => a + i, 0);
  toplamGider.value = Number(total_gider).toLocaleString("tr-TR", {
    style: "currency",
    currency: "TRY",
  });
  kalan.value = Number(totalGelir - total_gider).toLocaleString("tr-TR", {
    style: "currency",
    currency: "TRY",
  });
};

window.addEventListener("load", () => {
  document.querySelector("input[type=date]").value = new Date()
    .toISOString()
    .slice(0, 10);
});

resetButton.addEventListener("click", () => {
  gelirler = [];
  giderler = [];
  form.reset();
  gelir();
  setTotalGider();
  document.getElementById("sonuc-body").innerHTML = "";
});
