var serialPort = {}, ledState;

exports.action = function(data, next){
  info('Plugin DuinoRemote is called ...', data);
  
  if(data.cmd=='?') {
    ledState==0 ? data.tts=data.tts.replace('%','éteinte') : data.tts=data.tts.replace('%', 'allumée');
  }

  serialPort.write(data.cmd, function (err ,byteWritten){
    if (err) error('DuinoRemote: '+err);
    info("DuinoRemote: Commande = "+data.cmd+" (Envoi de "+byteWritten+" octets)");
  });

  serialPort.on('error', function (erreur) {error('DuinoRemote Error: '+erreur)});
  next({ });
}

exports.init = function(){
  var serial = require("serialport"),
      SerialPort = serial.SerialPort,
      portName = Config.modules.DuinoRemote.Port;

  serialPort = new SerialPort(portName, {
    baudrate: 9600,
    parser: serial.parsers.readline('\n')
  });

  serialPort.on('data', function (data) {ledState = data});
  info('Plugin DuinoRemote is initializing ...');
}
