var serialPort = {}, ledState;

exports.action = function(data, next){
  info('Plugin DuinoRemote is called ...', data);
  
  if(data.cmd=='?') {
    ledState==0 ? data.tts=data.tts.replace('%','éteinte') : data.tts=data.tts.replace('%', 'allumée');
  }

  serialPort.write(data.cmd, function (err ,byteWritten){
    if (err) error('Plugin DuinoRemote: '+err);
    info("Plugin DuinoRemote: Command = "+data.cmd+" (Sending "+byteWritten+" bytes)");
  });

  next({ });
}

exports.init = function(){
  var serial = require("serialport"),
      SerialPort = serial.SerialPort,
      portName = Config.modules.DuinoRemote.Port;
  if (!portName) return error('Plugin DuinoRemote: Undefined COM Port...');

  serialPort = new SerialPort(portName, {
    baudrate: 9600,
    parser: serial.parsers.readline('\n')
  });

  serialPort.on('data', function (data) {ledState = data});
  serialPort.on('error', function (erreur) {error('Plugin DuinoRemote: '+erreur)});
  info('Plugin DuinoRemote is initializing ...');
}
