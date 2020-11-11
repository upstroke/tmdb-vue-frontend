import moment from "moment";

export default {
    methods: {
        getFormatedDate: function(dateString) {
            if(dateString !=""){
                moment.locale('de');
                return moment(dateString).format('DD. MM. YYYY')
            }else{
                return 'kein Datum vorhanden'
            }

        }
    }
}
