const Person = {
    location(parent, args, { db }, info) {
        return db.people.find((person) => {
            return person.location == parent.location;
        })
    }
}

export default Person;