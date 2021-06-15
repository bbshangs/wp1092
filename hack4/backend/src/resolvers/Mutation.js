const Mutation = {
    insertPeople(parent, { data }, { db }, info) {
        for (var i = 0; i < data.length; i++) {
            // console.log(data[i].ssn)
            try {
                const idx = db.people.findIndex(({ssn}) => ssn === data[i].ssn)
                console.log(idx)
                if (idx < 0) {
                    console.log("add")
                    db.people.push(data[i]);
                }
                else {
                    console.log("repeat")
                    db.people[idx] = data[i]
                }
                // const result = db.people.find((person) => {
                //     return person.ssn == data[i].ssn;
                // })
                // console.log("result = ", result)
                // if (result) {
                //     console.log("repeat")
                //     const idx = db.people.findIndex((data[i].ssn) => {})
                //     console.log(idx)
                // }
                // else {
                //     console.log("add")
                //     db.people.push(data[i]);
                // }
            } catch (e){
                console.log(e)
                return false;
            }
        }
        return true;
    }
}
export default Mutation;