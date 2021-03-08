// onInit() {
//     let _this = this
//     //注册蓝牙适配器监听
//     bluetooth.onadapterstatechange = function (data) {
//       console.log("adapterState changed, now is", data.available);
//     };

//     //注册设备连接状态监听
//     bluetooth.onbleconnectionstatechange = function (data) {
//       console.log(`handling device state change: deviceId = ${data.deviceId}, connected = ${data.connected}`)
//       //更新设备连接状态
//       _this.connected = data.connected
//       if (data.connected) {
//         //目标设备连接后，获取服务列表
//         _this.getServices()
//       } else {
//         //做断开连接的相关操作，比如重新连接，或者重新扫描等
//       }
//     }

//     //注册特征值改变监听
//     bluetooth.onblecharacteristicvaluechange = function (data) {
//       console.log(`handling characteristic value change: deviceId = ${data.deviceId}, serviceId = ${data.serviceId}, characteristicId = ${data.characteristicId}, value = ${_this.ab2hex(data.value)}`)
//     }

//     //初始化蓝牙模块
//     bluetooth.openAdapter({
//       //是否打开系统蓝牙开关，默认false
//       operateAdapter: true,
//       success: function () {
//         console.log("success");
//       },
//       fail: function (data, code) {
//         console.log(`handling fail, code = ${code}`);
//         if (code === 10001) {
//           //蓝牙未打开，提示用户打开蓝牙
//         }
//       },
//       complete: function () {
//         console.log("complete");
//       }
//     });
//   },
//   //在结束时注销蓝牙模块
//   onDestroy() {
//     //取消不需要的状态监听
//     bluetooth.onadapterstatechange = null
//     bluetooth.onbleconnectionstatechange = null
//     bluetooth.onblecharacteristicvaluechange = null
//     bluetooth.ondevicefound = null

//     //注销蓝牙模块
//     bluetooth.closeAdapter({
//       //是否关闭系统蓝牙开关，默认false，此操作会直接关闭系统蓝牙，为了不影响用户其他蓝牙设备的体验，不建议设置为true
//       operateAdapter: false,
//       success: function () {
//         console.log("success");
//       },
//       fail: function (data, code) {
//         console.log(`handling fail, code = ${code}`);
//       },
//       complete: function () {
//         console.log("complete");
//       }
//     });
//   },
//   startDiscovery() {
//     let _this = this
//     //在扫描之前先注册设备发现回调
//     bluetooth.ondevicefound = function (data) {
//       console.log("new device list has founded");
//       data.devices.forEach(device => {
//         //发现所需设备后停止扫描
//         bluetooth.stopDevicesDiscovery();
//         _this.deviceId = device.deviceId;

//         console.log(`handling find new devive:${JSON.stringify(device)}`);
//         console.log(`handling advertisData = ${_this.ab2hex(device.advertisData)}`);
//         for (let key in device.serviceData) {
//           console.log(
//             `handling serviceData: uuid = ${key}, serviceData = ${_this.ab2hex(device.serviceData[key])}`
//           );
//         }
//       });
//     };
//     //开始扫描
//     bluetooth.startDevicesDiscovery({
//       //指定设备uuid，支持16-bit,32-bit,128-bit uuid,不填则扫描周围所有设备
//       services: ["1105"],
//       //是否允许重复设备上报，如果不需要监听广播包数据，建议不设置此项，默认值为false
//       allowDuplicatesKey: false,
//       success: function () {
//         console.log("success");
//       }
//     });
//   },
//   createConnection() {
//     let _this = this
//     //连接设备
//     bluetooth.createBLEConnection({
//       deviceId: _this.deviceId,
//       success: function () {
//         console.log("success")
//       },
//       fail: function (data, code) {
//         console.log(`handling fail, code = ${code}`)
//       },
//       complete: function () {
//         console.log("complete")
//       }
//     })
//   },
//   closeConnection() {
//     let _this = this
//     bluetooth.closeBLEConnection({
//       deviceId: _this.deviceId,
//       success: function () {
//         console.log("success")
//       },
//       fail: function (data, code) {
//         console.log(`handling fail, code = ${code}`)
//       },
//       complete: function () {
//         console.log("complete")
//       }
//     })
//   },
//   getServices() {
//     let _this = this
//     bluetooth.getBLEDeviceServices({
//       deviceId: _this.deviceId,
//       success: function (data) {
//         data.services.forEach(service => {
//           console.log(`handling device services: uuid = ${service.uuid}, isPrimary = ${service.isPrimary}`)
//           //获取需要的服务，可以根据设备定义的uuid筛选
//           if (service.isPrimary) {
//             _this.serviceId = service.uuid
//             //获取特征列表
//             _this.getCharacteristics()
//           }
//         })
//       },
//       fail: function (data, code) {
//         console.log(`handling fail, code = ${code}`)
//       },
//       complete: function () {
//         console.log("complete")
//       }
//     })
//   },
//   getCharacteristics() {
//     let _this = this
//     bluetooth.getBLEDeviceCharacteristics({
//       deviceId: _this.deviceId,
//       serviceId: _this.serviceId,
//       success: function (data) {
//         data.characteristics.forEach(characteristic => {
//           console.log(`handling device characteristic : ${JSON.stringify(characteristic)}`)
//           //获取需要的特征，可以根据设备定义的uuid筛选
//           if (characteristic.properties.write) {
//             _this.writeCharacteristicId = characteristic.uuid
//           } else if (characteristic.properties.read) {
//             _this.readCharacteristicId = characteristic.uuid
//           } else if (characteristic.properties.notify || characteristic.properties.indicate) {
//             _this.notifyCharacteristicId = characteristic.uuid
//           }
//         })
//       },
//       fail: function (data, code) {
//         console.log(`handling fail, code = ${code}`)
//       },
//       complete: function () {
//         console.log("complete")
//       }
//     })
//   },
//   write() {
//     let _this = this
//     let buffer = new ArrayBuffer(2)
//     let dataView = new DataView(buffer)
//     dataView.setUint8(0, 0)
//     dataView.setUint8(1, 0xf)
//     bluetooth.writeBLECharacteristicValue({
//       // 这里的 deviceId 需要在 getBluetoothDevices 或 onBluetoothDeviceFound接口中获取
//       deviceId: _this.deviceId,
//       // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
//       serviceId: _this.serviceId,
//       // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
//       characteristicId: _this.writeCharacteristicId,
//       // 这里的value是ArrayBuffer类型
//       value: buffer,
//       success: function () {
//         console.log("success")
//       },
//       fail: function (data, code) {
//         console.log(`handling fail, code = ${code}`)
//       },
//       complete: function () {
//         console.log("complete")
//       }
//     })
//   },
//   read() {
//     let _this = this
//     bluetooth.readBLECharacteristicValue({
//       // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
//       deviceId: _this.deviceId,
//       // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
//       serviceId: _this.serviceId,
//       // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
//       characteristicId: _this.readCharacteristicId,
//       success: function () {
//         // 执行操作成功，读取的值会在onblecharacteristicvaluechange 接口中上报
//         console.log("success")
//       }
//     })
//   },
//   notifyDevice(enable) {
//     let _this = this
//     bluetooth.notifyBLECharacteristicValueChange({
//       // 启用 notify 功能
//       state: enable,
//       // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
//       deviceId: _this.deviceId,
//       // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
//       serviceId: _this.serviceId,
//       // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
//       characteristicId: _this.notifyCharacteristicId,
//       success: function () {
//         // 执行操作成功，读取的值会在onblecharacteristicvaluechange 接口中上报
//         _this.notifyEnabled = enable
//         console.log("success")
//       },
//       fail: function (data, code) {
//         console.log(`handling fail, code = ${code}`)
//       },
//       complete: function () {
//         console.log("complete")
//       }
//     })
//   }
// };