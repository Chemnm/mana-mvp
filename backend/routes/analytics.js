const router = require('express').Router();
const WasteEvent = require('../models/wasteEvent.model');
const mongoose = require('mongoose');

// Helper function to get filter based on facilityId
const getFacilityFilter = (facilityId) => {
  return facilityId ? { facilityId: new mongoose.Types.ObjectId(facilityId) } : {};
};

// GET Dashboard Stats (All Facilities)
router.route('/stats').get(async (req, res) => {
  try {
    const filter = {};

    const totalWaste = await WasteEvent.aggregate([
      { $match: filter },
      { $group: { _id: null, total: { $sum: '$costUsd' } } }
    ]);

    const wasteEvents = await WasteEvent.countDocuments(filter); 

    // In a real app, compliance would be a more complex calculation 2
    const complianceRate = 94.5; // Mocking this for now

    res.json({
      totalWaste: totalWaste.length > 0 ? totalWaste[0].total : 0,
      wasteEvents,
      complianceRate,
    });
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// GET Dashboard Stats (Specific Facility)
router.route('/stats/:facilityId').get(async (req, res) => {
  try {
    const filter = getFacilityFilter(req.params.facilityId);

    const totalWaste = await WasteEvent.aggregate([
      { $match: filter },
      { $group: { _id: null, total: { $sum: '$costUsd' } } }
    ]);

    const wasteEvents = await WasteEvent.countDocuments(filter);

    // In a real app, compliance would be a more complex calculation
    const complianceRate = 94.5; // Mocking this for now

    res.json({
      totalWaste: totalWaste.length > 0 ? totalWaste[0].total : 0,
      wasteEvents,
      complianceRate,
    });
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// GET Top Wasted Foods (All Facilities)
router.route('/top-wasted-foods').get(async (req, res) => {
    try {
      const filter = {};
  
      const topWastedFoods = await WasteEvent.aggregate([
        { $match: filter },
        { $group: { _id: '$ingredient', total: { $sum: '$costUsd' } } },
        { $sort: { total: -1 } },
        { $limit: 5 },
        { $project: { name: '$_id', value: '$total', _id: 0 } }
      ]);
  
      res.json(topWastedFoods);
    } catch (err) {
      res.status(400).json('Error: ' + err);
    }
  });

// GET Top Wasted Foods (Specific Facility)
router.route('/top-wasted-foods/:facilityId').get(async (req, res) => {
    try {
      const filter = getFacilityFilter(req.params.facilityId);
  
      const topWastedFoods = await WasteEvent.aggregate([
        { $match: filter },
        { $group: { _id: '$ingredient', total: { $sum: '$costUsd' } } },
        { $sort: { total: -1 } },
        { $limit: 5 },
        { $project: { name: '$_id', value: '$total', _id: 0 } }
      ]);
  
      res.json(topWastedFoods);
    } catch (err) {
      res.status(400).json('Error: ' + err);
    }
  });

// GET Top Wasted Ingredients Detailed (All Facilities)
router.route('/top-wasted-ingredients-detailed').get(async (req, res) => {
    try {
      const filter = {};
  
      const topWastedIngredients = await WasteEvent.aggregate([
        { $match: filter },
        { $group: { _id: { ingredient: '$ingredient', wasteType: '$wasteType' }, total: { $sum: '$costUsd' } } },
        { $group: { _id: '$_id.ingredient', wasteTypes: { $push: { wasteType: '$_id.wasteType', total: '$total' } }, total: { $sum: '$total' } } },
        { $sort: { total: -1 } },
        { $limit: 5 },
        { $project: { name: '$_id', wasteTypes: 1, total: 1, _id: 0 } }
      ]);
  
      res.json(topWastedIngredients);
    } catch (err) {
      res.status(400).json('Error: ' + err);
    }
  });

// GET Top Wasted Ingredients by CO2 (All Facilities)
router.route('/top-wasted-ingredients-co2').get(async (req, res) => {
    try {
      const filter = {};
  
      const topWastedIngredients = await WasteEvent.aggregate([
        { $match: filter },
        { $group: { _id: '$wasteType', total: { $sum: '$co2e' } } },
        { $sort: { total: -1 } },
        { $limit: 5 },
        { $project: { name: '$_id', value: '$total', _id: 0 } }
      ]);
  
      res.json(topWastedIngredients);
    } catch (err) {
      res.status(400).json('Error: ' + err);
    }
  });

// GET Top Wasted Ingredients Detailed (Specific Facility)
router.route('/top-wasted-ingredients-detailed/:facilityId').get(async (req, res) => {
    try {
      const filter = getFacilityFilter(req.params.facilityId);
  
      const topWastedIngredients = await WasteEvent.aggregate([
        { $match: filter },
        { $group: { _id: { ingredient: '$ingredient', wasteType: '$wasteType' }, total: { $sum: '$costUsd' } } },
        { $group: { _id: '$_id.ingredient', wasteTypes: { $push: { wasteType: '$_id.wasteType', total: '$total' } }, total: { $sum: '$total' } } },
        { $sort: { total: -1 } },
        { $limit: 5 },
        { $project: { name: '$_id', wasteTypes: 1, total: 1, _id: 0 } }
      ]);
  
      res.json(topWastedIngredients);
    } catch (err) {
      res.status(400).json('Error: ' + err);
    }
  });

// GET Top Wasted Ingredients by CO2 (Specific Facility)
router.route('/top-wasted-ingredients-co2/:facilityId').get(async (req, res) => {
    try {
      const filter = getFacilityFilter(req.params.facilityId);
  
      const topWastedIngredients = await WasteEvent.aggregate([
        { $match: filter },
        { $group: { _id: '$wasteType', total: { $sum: '$co2e' } } },
        { $sort: { total: -1 } },
        { $limit: 5 },
        { $project: { name: '$_id', value: '$total', _id: 0 } }
      ]);
  
      res.json(topWastedIngredients);
    } catch (err) {
      res.status(400).json('Error: ' + err);
    }
  });

  // GET Top Loss Reasons (All Facilities)
  router.route('/top-loss-reasons').get(async (req, res) => {
    try {
        const filter = {};
    
        const topLossReasons = await WasteEvent.aggregate([
            { $match: filter },
            { $group: { _id: '$wasteType', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 },
            { $project: { name: '$_id', value: '$count', _id: 0 } }
        ]);
    
        res.json(topLossReasons);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

  // GET Top Loss Reasons (Specific Facility)
router.route('/top-loss-reasons/:facilityId').get(async (req, res) => {
    try {
        const filter = getFacilityFilter(req.params.facilityId);
    
        const topLossReasons = await WasteEvent.aggregate([
            { $match: filter },
            { $group: { _id: '$wasteType', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 },
            { $project: { name: '$_id', value: '$count', _id: 0 } }
        ]);
    
        res.json(topLossReasons);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// GET Waste Trend (All facilities)
router.route('/waste-trend').get(async (req, res) => {
    try {
        const { from, to } = req.query;
        const filter = {};
        if (from && to) {
            filter.timestamp = { $gte: new Date(from), $lte: new Date(to) };
        }

        const wasteTrend = await WasteEvent.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d %H:00", date: "$timestamp" } },
                    totalCost: { $sum: "$costUsd" }
                }
            },
            { $sort: { _id: 1 } },
            { $project: { name: '$_id', value: '$totalCost', _id: 0 } }
        ]);

        res.json(wasteTrend);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// GET Waste Trend (Specific Facility)
router.route('/waste-trend/:facilityId').get(async (req, res) => {
    try {
        const { from, to } = req.query;
        const filter = getFacilityFilter(req.params.facilityId);
        if (from && to) {
            filter.timestamp = { $gte: new Date(from), $lte: new Date(to) };
        }

        const wasteTrend = await WasteEvent.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d %H:00", date: "$timestamp" } },
                    totalCost: { $sum: "$costUsd" }
                }
            },
            { $sort: { _id: 1 } },
            { $project: { name: '$_id', value: '$totalCost', _id: 0 } }
        ]);

        res.json(wasteTrend);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});


// GET Quick Insights (All facilities)
router.route('/quick-insights').get(async (req, res) => {
    try {
        const filter = {};
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        filter.timestamp = { $gte: sevenDaysAgo };

        const peakTime = await WasteEvent.aggregate([
            { $match: filter },
            { $project: { hour: { $hour: "$timestamp" } } },
            { $group: { _id: "$hour", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 1 }
        ]);

        const mostAffectedLine = await WasteEvent.aggregate([
            { $match: filter },
            { $group: { _id: "$productionLine", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 1 }
        ]);

        const topWasteCategory = await WasteEvent.aggregate([
            { $match: filter },
            { $group: { _id: "$wasteType", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 1 }
        ]);

        res.json({
            peakWasteTime: peakTime.length > 0 ? `${peakTime[0]._id}:00 - ${peakTime[0]._id + 1}:00` : 'N/A',
            mostAffectedLine: mostAffectedLine.length > 0 ? mostAffectedLine[0]._id : 'N/A',
            topWasteCategory: topWasteCategory.length > 0 ? topWasteCategory[0]._id : 'N/A',
            complianceImprovement: '+12%', // Mocked for now
        });
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// GET Quick Insights (Specific Facility)
router.route('/quick-insights/:facilityId').get(async (req, res) => {
    try {
        const filter = getFacilityFilter(req.params.facilityId);
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        filter.timestamp = { $gte: sevenDaysAgo };

        const peakTime = await WasteEvent.aggregate([
            { $match: filter },
            { $project: { hour: { $hour: "$timestamp" } } },
            { $group: { _id: "$hour", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 1 }
        ]);

        const mostAffectedLine = await WasteEvent.aggregate([
            { $match: filter },
            { $group: { _id: "$productionLine", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 1 }
        ]);

        const topWasteCategory = await WasteEvent.aggregate([
            { $match: filter },
            { $group: { _id: "$wasteType", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 1 }
        ]);

        res.json({
            peakWasteTime: peakTime.length > 0 ? `${peakTime[0]._id}:00 - ${peakTime[0]._id + 1}:00` : 'N/A',
            mostAffectedLine: mostAffectedLine.length > 0 ? mostAffectedLine[0]._id : 'N/A',
            topWasteCategory: topWasteCategory.length > 0 ? topWasteCategory[0]._id : 'N/A',
            complianceImprovement: '+12%', // Mocked for now
        });
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// GET Production Efficiency (All facilities)
router.route('/production-efficiency').get(async (req, res) => {
    try {
        const filter = {};
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        filter.timestamp = { $gte: sevenDaysAgo };

        const efficiency = await WasteEvent.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
                    totalWaste: { $sum: "$weightKg" }
                }
            },
            { $sort: { _id: 1 } },
            { $project: { name: '$_id', value: '$totalWaste', _id: 0 } }
        ]);

        res.json(efficiency);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// GET Production Efficiency (Specific Facility)
router.route('/production-efficiency/:facilityId').get(async (req, res) => {
    try {
        const filter = getFacilityFilter(req.params.facilityId);
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        filter.timestamp = { $gte: sevenDaysAgo };

        const efficiency = await WasteEvent.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
                    totalWaste: { $sum: "$weightKg" }
                }
            },
            { $sort: { _id: 1 } },
            { $project: { name: '$_id', value: '$totalWaste', _id: 0 } }
        ]);

        res.json(efficiency);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// GET Operator Efficiency (All facilities)
router.route('/operator-efficiency').get(async (req, res) => {
    try {
        const { from, to } = req.query;
        const filter = {};
        if (from && to) {
            filter.timestamp = { $gte: new Date(from), $lte: new Date(to) };
        }

        const efficiency = await WasteEvent.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: "$operatorId",
                    totalWaste: { $sum: "$weightKg" }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "operator"
                }
            },
            {
                $unwind: "$operator"
            },
            { $sort: { totalWaste: -1 } },
            { $project: { name: '$operator.name', value: '$totalWaste', _id: 0 } }
        ]);

        res.json(efficiency);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// GET Operator Efficiency (Specific Facility)
router.route('/operator-efficiency/:facilityId').get(async (req, res) => {
    try {
        const { from, to } = req.query;
        const filter = getFacilityFilter(req.params.facilityId);
        if (from && to) {
            filter.timestamp = { $gte: new Date(from), $lte: new Date(to) };
        }

        const efficiency = await WasteEvent.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: "$operatorId",
                    totalWaste: { $sum: "$weightKg" }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "operator"
                }
            },
            {
                $unwind: "$operator"
            },
            { $sort: { totalWaste: -1 } },
            { $project: { name: '$operator.name', value: '$totalWaste', _id: 0 } }
        ]);

        res.json(efficiency);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

module.exports = router;
