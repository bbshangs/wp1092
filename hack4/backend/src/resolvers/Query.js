const Query = {
    statsCount(parent, { severity, locationKeywords }, { db }, info) {
        console.log(severity)
        console.log(locationKeywords)
        if (!locationKeywords) {
            return null;
        }
        var response = []
        for (var i = 0; i < locationKeywords.length; i++) {
            const people1 = db.people.filter((person) => {
                return person.location.description.includes(locationKeywords[i]);
            });
            if (!severity) {
                const people2 = db.people.filter((person) => {
                    return person.severity >= severity;
                });
                response.push(people2.length);
            }
            else {
                response.push(people1.length);
            }
        }
        return response;
    },
    people(parent, { ssn }, { db }, info) {
        return db.people.filter((people) => people.ssn == ssn)
    }
}
export default Query;


