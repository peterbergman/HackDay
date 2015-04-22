/**
* PressController
*
* @description :: Server-side logic for managing presses
* @help        :: See http://links.sailsjs.org/docs/controllers
*/

module.exports = {
	lastDay: function(req, res) {
		Press.native(function(errror, collection){
			collection.aggregate(
				{
					$project:
					{
						'date': {'$substr': ['$createdAt', 0, 13] },
						'option': '$option'
					},
				},
				{
					$group: {
						'_id': '$date',
						total: {
							$sum: 1
						},
						options: {
							'$push': '$option'
						}
					},
				},
				{
					$unwind: '$options'
				},
				{
					$group: {
						'_id': {
							'options': '$options',
							'date': '$_id'
						},
						totalOption: {
							$sum: 1
						},
						dates: {
							'$addToSet': '$_id'
						}
					}
				},
				{
					$unwind: '$dates'
				},
				{
					$group: {
						'_id': '$dates',
						options: {
							'$addToSet': {'option': '$_id.options', 'count': '$totalOption'}
						}
					}
				},
				{
					$sort: {
						'_id' : 1
					}
				}, function(e, r) {
						console.log(r);
						res.send(r);
						if (e) return res.serverError(e);
					});
				})
			}
		};
