
class ValidadeThings{

    validando_number(number){
        if(number.length != 11) return false
        else{
            return true
        }
    }

    async tratando_dados(number){
        const numero = number
        const dados = await this.data(numero)
        const obj = this.formatando_infos(dados)
        return obj
    }

    async data(numero){
        try {
            const response = await fetch(`https://api2.ploomes.com/Deals?$select=Id,Title,PipelineId,StageId,LastStageId,OwnerId,Amount,StartAmount&$expand=Contact($select=Id,Name,Email;$expand=Phones),Status,OtherProperties($expand=Field($select=Name))&$filter=Contact/Phones/any+(p:p/SearchPhoneNumber+eq+${numero})+and+Status/Name+eq+'Em+aberto'&$top=10&$skip0`, {method: "GET", headers: {'Content-Type': 'application/json','User-key': "ED1AE6F461035E0E94A2A309E9A547E086C2FB5208C3AEB98883AAC90944785082D39FFAEA0C077B9222634E452D1DD97FF7FF7A0A387A4F4416993A50683FD0"}})
            const result = await response.json()
            return result
        }catch(e){
            return e
        }
    }

    formatando_infos(deal){
        if(deal){

            let array = deal.value[0].OtherProperties

            let CidadeDaGarantia = 'oi';
            let ValorDaGarantia = 0;
            let ValorSolicitado = 0;
            let ComPrazo = 0;
            let Amortizacao = 'oi';
            let PertenceAoTomador = 'oi';

            array.forEach(element => {
                if(element.Field.Name == "Cidade da garantia (SIMULAÇÃO)"){
                    CidadeDaGarantia = element.StringValue;
                }
                if(element.Field.Name == "Valor da garantia (SIMULAÇÃO)"){
                    ValorDaGarantia = ''+element.DecimalValue;
                }
                if(element.Field.Name == "Valor (SIMULAÇÃO)"){
                    ValorSolicitado = ''+element.DecimalValue;
                }
                if(element.Field.Name == "Prazo (SIMULAÇÃO)"){
                    ComPrazo = ''+element.IntegerValue;
                }
                if(element.Field.Name == "Amortização (SOLICITADO)"){
                        Amortizacao = element.ObjectValueName
                }
                if(element.Field.Name == "A garantia pertence ao tomador?"){
                    PertenceAoTomador = element.ObjectValueName
                }
            });
    
            const obj = {
                "CidadeDaGarantia": CidadeDaGarantia,
                "ValorDaGarantia": ValorDaGarantia,
                "ValorSolicitado": ValorSolicitado,
                "ComPrazo": ComPrazo,
                "Amortizacao": Amortizacao,
                "PertenceAoTomador": PertenceAoTomador
            }
    
            return obj;
        }
    }
}

module.exports = ValidadeThings
