document.getElementById('investmentForm').addEventListener('submit', function(e){
  e.preventDefault();


  let P = parseFloat(document.getElementById('patrimonioInicial').value);
  let r = parseFloat(document.getElementById('rentabilidade').value) / 100;
  let carta = parseFloat(document.getElementById('cartaCredito').value);
  let le = parseFloat(document.getElementById('lanceEmbutido').value) / 100;
  let ll = parseFloat(document.getElementById('lanceLivre').value) / 100;
  let taxaCarta = parseFloat(document.getElementById('taxaCarta').value) / 100;
  let PrazoEst = parseFloat(document.getElementById('PrazoEst').value)




  let valorLanceEmbutido = carta * le;
  let valorLanceLivre = carta * ll;
  let totalLances = valorLanceEmbutido + valorLanceLivre;
  let creditoLiberado = carta - valorLanceEmbutido;
  let rent =  P * r
  let ParcelRed = (carta >= 600000) ? (creditoLiberado * (0.426785714285714/100)) :
                (carta < 600000 && carta > 281000) ? (creditoLiberado * (0.432142857142857/100)) :
                (carta < 280000) ? (creditoLiberado * (0.446428571428571/100)) : 0;
  let RentParc = P * r - ParcelRed
  let Cat = (carta >= 600000) ? (carta + carta * (0.175 + 0.02)) :
                (carta < 600000 && carta > 281000) ? (carta + carta * (0.19 + 0.02)) :
                (carta < 280000) ? (carta + carta * (0.23 + 0.02)) :
                carta;
  let RepresentLanc = totalLances/Cat
  let ParcCom = (carta >= 600000) ? (creditoLiberado * (0.426785714285714/100)) :
                (carta < 600000 && carta > 281000) ? (carta * (0.432142857142857/100)) :
                (carta < 280000) ? (creditoLiberado * (0.446428571428571/100)) :
                0;



  let patrimonioRestante = P * (1 + (RentParc / P)) ** PrazoEst - valorLanceLivre;
  let RentPosConten = patrimonioRestante * 0.01;
  let RentPosContenRent = RentPosConten - ParcCom
  let PatriImobilizado = creditoLiberado


  let rendimentoCarta = creditoLiberado * taxaCarta;
  let rendimentoTotal = patrimonioRestante * r + rendimentoCarta;
  let RendPosCon2 = rendimentoCarta + RentPosContenRent;


  let patrimonioFinal = PatriImobilizado + patrimonioRestante;
  let CresPatri = patrimonioFinal/P-1;


  document.getElementById('result').innerHTML = `
    <p>Rentabilidade (R$): ${(rent).toFixed(2)}</p>
    <p>Categoria: ${Cat.toFixed(2)}</p>
    <p>Valor Lance Embutido (R$): ${valorLanceEmbutido.toFixed(2)}</p>
    <p>Valor Lance Livre (R$): ${valorLanceLivre.toFixed(2)}</p>
    <p>Parcela Reduzida ate Contemplação (R$) - Sem Seguro: ${ParcelRed.toFixed(2)}</p>
    <p>Rentabilidade (-) Parcela Paga com Pré Contemplação (R$): ${RentParc.toFixed(2)}</p>
    <p>Total em Lances (R$): ${totalLances.toFixed(2)}</p>
    <p>Crédito Liberado (R$): ${creditoLiberado.toFixed(2)}</p>
    <p>Representatividade (%): ${(RepresentLanc * 100).toFixed(2)}%</p>
    <p>Patrimônio Restante Após Lance (R$): ${patrimonioRestante.toFixed(2)}</p>
    <p>Parcela Pós Contemplação (R$): ${ParcCom.toFixed(2)}</p>
    <p>Rentabilidade Pós Contemplação (R$): ${RentPosConten.toFixed(2)}</p>
    <p>Rentabilidade (-) Parcela Paga com Pós Contemplação (R$): ${RentPosContenRent.toFixed(2)}</p>
    <p>Patrimônio Imobilizado (R$): ${PatriImobilizado.toFixed(2)}</p>
    <p>Rendimento Carta (R$): ${rendimentoCarta.toFixed(2)}</p>
    <p>Rendimento Pós Contemplação (R$): ${RendPosCon2.toFixed(2)}</p>
    <p><strong>Patrimônio Final (R$): ${patrimonioFinal.toFixed(2)}</strong></p>
    <p><strong>Crescimento Patrimonial (%) - PRAZO: ${(CresPatri * 100).toFixed(2)}%</strong></p>
    <p><strong>Crescimento Patrimonial (%) - MENSAL: ${((CresPatri * 100)/PrazoEst).toFixed(2)}%</strong></p>
  `;
});
