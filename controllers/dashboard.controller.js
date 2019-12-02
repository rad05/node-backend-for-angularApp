const path = require('path')
const Stock = require(path.join(__dirname, '../models/stockModel.js')).Stocks



exports.list = async function list(req, res, next) {
    try {
        let stocks = await Stock.find({});
        console.log(stocks)
        return res.status(200).json({
            message: "success",
            data: stocks
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Error",
            error: error
        })
    }
}

exports.populateData = async (req, res, next)=>{
    console.log("CALLED")
    try {
        myData = [{ stockName: "apple", stockPrice: "300", quantity: 5 },
        { stockName: "samsung", stockPrice: "500", quantity: 10 },
        { stockName: "moto", stockPrice: "100", quantity: 20 },
        { stockName: "nokia", stockPrice: "400", quantity: 2 },
        { stockName: "sony", stockPrice: "200", quantity: 10 },
        { stockName: "oppo", stockPrice: "400", quantity: 10 }]

       let docs = await Stock.insertMany(myData);
       return res.status(200).json({
        message: "successful",
        "data":docs
    })
  }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "error",
            error: error
        })
    }
}

exports.getStock = async (req, res) => {
    try {
        let result = await Stock.findOne({ _id: req.query._id });
        if (result.status) {
            return res.status(200).json({
                message: "success",
                data: result.data
            })
        }
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Error",
            error: res
        })
    }
}

// exports.update = async function update(req, res, next) {
//     try {
//         _id, deviceName, deviceType, deviceIp
//         const filter = { _id: req.body._id };
//         const update = { quantity: req.body.quantity };
//         let doc = await Stock.findOneAndUpdate(filter, update, {
//             new: true
//         });
//         if (doc == null) {
//             return { "status": 1, "data": null };
//         }
//         else {
//             return { "status": 1, "data": doc };
//         }
//     }
//     catch (error) {
//         return { "status": 0, "data": error };
//     }
// }

exports.delete = async function remove(req, res, next) {
    try {
        let count = await Device.count({ _id: req.body._id })

        if (count == 1) {
            //make count 0
            const filter = { _id: req.body._id };
            const update = { quantity: 0 };
            let doc = await Stock.findOneAndUpdate(filter, update, {
                new: true
            })
            return res.status(200).json({
                message: "Success",
                data: doc
            });
        }
        if (count == 0) {
            return res.status(200).json({
                message: "No record found"
            })
        }
        if (count > 1) {
            //decrement count
            const filter = { _id: req.body._id };
            const update = { quantity: req.body.quantity - 1 };
            let doc = await Device.findOneAndUpdate(filter, update, {
                new: true
            });
            return res.status(200).json({
                message: "Success",
                data: doc
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: "success",
            error: error
        })
    }
}