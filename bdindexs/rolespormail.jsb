db.users.aggregate(
        { $unwind: '$emails' },
        { $unwind: '$roles' }, 
        { $project: { _id:0, email: '$emails.address', rol: '$roles'}},
        { $match: { rol: { $ne:'SuperAdminHolos'}}}
    )
