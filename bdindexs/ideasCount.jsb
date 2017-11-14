db.ideas.aggregate()
      .match({ 'person.areaId': { $in:['bbnfxN2RZYLfmzjDd', 'ug69sAnFKXCvsXvwk'] })
      //.project("gender _id")
      //.unwind("$arrayField")
      .group({ 
          _id: '', 
          count: { $sum: 1 } });