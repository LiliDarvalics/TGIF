var app = new Vue({

    el: '#main',

    data: {
        membersArray: [],
        allMembers: [],
        states: [],
        senate: "https://api.propublica.org/congress/v1/113/senate/members.json",
        house: "https://api.propublica.org/congress/v1/113/house/members.json",
    },

    created: function() {

         if (location.pathname == "/Users/lilidarvalics/Documents/Ubiqum%20exercises/TGIF/senate-data.html") {
            this.getCongressData(this.senate);

        } else if (location.pathname == "/Users/lilidarvalics/Documents/Ubiqum%20exercises/TGIF/house-data.html") {
            this.getCongressData(this.house);
        }
    },

    methods: {

        getCongressData(link) {
            fetch(link, {
                    "method": "GET",
                    "headers": {
                        'X-API-Key': "7UGw37brAbAI6CFkEv0vrCECV5DcM04LcBp37ZqK"
                    }
                })
                .then(r => r.json())
                .then(json => {
                    console.log(json);
                    data = json;

                    app.membersArray = json.results[0].members;
                    app.allMembers = json.results[0].members;
                    app.duplicateStates()
                })
        },

        myFilter() {

            var empty = [];

            var membersArray = app.allMembers;

            var dropdown = document.getElementById('states');

            var democrat = document.getElementById('democrat');

            var republican = document.getElementById('republican');

            var independent = document.getElementById('independent');

            for (i = 0; i < membersArray.length; i++) {
                if (dropdown.value == membersArray[i].state || dropdown.value == 'All') {

                    if (democrat.checked && membersArray[i].party == "D") {
                        empty.push(membersArray[i]);
                    }
                    if (republican.checked && membersArray[i].party == "R") {
                        empty.push(membersArray[i]);
                    }
                    if (independent.checked && membersArray[i].party == "I") {
                        empty.push(membersArray[i]);
                    }
                }
            }
            app.membersArray = empty;
        },

        duplicateStates: function () {

            var membersArray = app.membersArray;

            var duplicates = [];

            for (i = 0; i < membersArray.length; i++) {
                for (j = i + 1; j < membersArray.length; j++) {
                    if (membersArray[i].state == membersArray[j].state && !duplicates.includes(membersArray[i].state)) {
                        duplicates.push(membersArray[i].state);
                    }
                }
            }
            app.states = duplicates.sort();
        },
    },
})
