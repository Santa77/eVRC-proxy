
const adpu = require('./eVRCadpu')

// var TLV = require('tlv');

const STATUS = {
  START: 'START',
  READING: 'READING',
  COMPLETE: 'COMPLETE',
  ERROR: 'ERROR'
}

let eVRC_data = {}

const decodeDocumentData = () => {
  eVRC_data.s_Document_Name=eVRC_data.raw_name_data.subarray(12,12+eVRC_data.raw_name_data[11]).toString()	
  const b1=eVRC_data.raw_name_data[12+1+eVRC_data.raw_name_data[11]];
  const b2=12+2+eVRC_data.raw_name_data[11];
  eVRC_data.s_Country=eVRC_data.raw_name_data.subarray(b2,b2+b1).toString()	
  delete eVRC_data.raw_name_data
}


const decodeRegistrationA = () => {

  let i=0
  let l=0
  let TAG=0
  let TAG2=0

  let data=eVRC_data.raw_data_a
  let rega={}
  

  while (i<Buffer.byteLength(data)) {
     TAG = data[i]
     TAG2 = 0
     if (TAG==0x9F){
        TAG2=data[i+1];
        i++;
     }
     l=data[i+1];     

     switch(TAG) {
	case 0x78: // to be done to crack
		break
	case 0x00:
		l=-1
		break
	case 0x71:
		l=-1
		break
	case 0xA1:    // these do not have length, they just structural 
	case 0xA2:
	case 0xA3:
	case 0xA4:
	case 0xA5:
	case 0xA6:
		l=0
		break
//	case 0x4f: // something that belonge under 0x78
//		rega.app_id=data.subarray(i+2, i+2+l).toString()
//		break
	case 0x80:
		rega.version=data.subarray(i+2, i+2+l).toString()
		break
	case 0x81:
		rega.registration_number=data.subarray(i+2, i+2+l).toString()
		break
	case 0x82:
		rega.first_registration_date=data.subarray(i+2, i+2+l).toString()
		break

	case 0x83:
		if (!rega.user) rega.user={}
		rega.user.legal_name=data.subarray(i+2, i+2+l).toString()
		break
	case 0x84:
		if (!rega.user) rega.user={}
		rega.user.first_name=data.subarray(i+2, i+2+l).toString()
		break
	case 0x85:
		if (!rega.user) rega.user={}
		rega.user.address=data.subarray(i+2, i+2+l).toString()
		break
	case 0x86:
		if (!rega.user) rega.user={}
		rega.user.role=data.subarray(i+2, i+2+l).toString()
		break
	case 0x87:
		if (!rega.description) rega.description={}
		rega.description.brand=data.subarray(i+2, i+2+l).toString()
		break
	case 0x88:
		if (!rega.description) rega.description={}
		rega.description.model=data.subarray(i+2, i+2+l).toString()
		break
	case 0x89:
		if (!rega.description) rega.description={}
		rega.description.commercial_description=data.subarray(i+2, i+2+l).toString()
		break
	case 0x8A:
		rega.VIN=data.subarray(i+2, i+2+l).toString()
		break
	case 0x8B:
		rega.max_permissible_laden_mass=data.subarray(i+2, i+2+l).toString()
		break
	case 0x8C:
		rega.mass=data.subarray(i+2, i+2+l).toString()
		break

	case 0x8D:
		rega.expiry_date=data.subarray(i+2, i+2+l).toString()
		break
	case 0x8E:
		rega.issuing_date=data.subarray(i+2, i+2+l).toString()
		break
	case 0x8F:
		rega.type_approval_number=data.subarray(i+2, i+2+l).toString()
		break
	case 0x90:
		if (!rega.engine) rega.engine={}
		rega.engine.engine_capacity=data.subarray(i+2, i+2+l).toString()
		break
	case 0x91:
		if (!rega.engine) rega.engine={}
		rega.engine.max_net_power=data.subarray(i+2, i+2+l).toString()
		break
	case 0x92:
		if (!rega.engine) rega.engine={}
		rega.engine.fuel_type=data.subarray(i+2, i+2+l).toString()
		break
	case 0x93:
		rega.power_weight_ratio=data.subarray(i+2, i+2+l).toString()
		break
	case 0x94:
		if (!rega.seats) rega.seats={}
		rega.seats.seats_number=data.subarray(i+2, i+2+l).toString()
		break
	case 0x95:
		if (!rega.seats) rega.seats={}
		rega.seats.standing_places_number=data.subarray(i+2, i+2+l).toString()
		break
	case 0x9F:
                switch(TAG2) {
		   case 0x33:
			if (!rega.document) rega.document={}
			rega.document.issuing_state=data.subarray(i+2, i+2+l).toString()
			break
		   case 0x34:
			if (!rega.document) rega.document={}
			rega.document.issuing_state_desc=data.subarray(i+2, i+2+l).toString()
			break
		   case 0x35:
			if (!rega.document) rega.document={}
			rega.document.competent_authority=data.subarray(i+2, i+2+l).toString()
			break
		   case 0x36:
			if (!rega.document) rega.document={}
			rega.document.issuing_authority=data.subarray(i+2, i+2+l).toString()
			break
		   case 0x37:
			if (!rega.document) rega.document={}
			rega.document.charset=data.subarray(i+2, i+2+l).toString()
			break
		   case 0x38:
			if (!rega.document) rega.document={}
			rega.document.unambiguous_number=data.subarray(i+2, i+2+l).toString()
			break
		   default:
			console.log('Unknown2 tag [',TAG.toString(16),',',TAG2.toString(16),']')
			break

		}
		break

	default:
		console.log('Unknown tag [',TAG.toString(16),',',TAG2.toString(16),']')
		break
     }


     i=i+l+2
  }

  eVRC_data.RegistrationA=rega
  delete eVRC_data.raw_data_a

}



const decodeRegistrationB = () => {

  let i=0
  let l=0
  let TAG=0
  let TAG2=0
  let A1=0

  let data=eVRC_data.raw_data_b
  let regb={}
  

  while (i<Buffer.byteLength(data)) {
     TAG = data[i]
     TAG2 = 0
     if (TAG==0x9F){
        TAG2=data[i+1];
        i++;
     }
     l=data[i+1];     

     switch(TAG) {
	case 0x78: // to be done to crack
		break
	case 0x00:
		l=-1
		break
	case 0x72:
		l=-1
		break
	case 0xA1:
	case 0xA4:
	case 0xA5:
	case 0xAD:
	case 0xAE:
	case 0xAF:
	case 0xB0:
		l=0
		break
	case 0xA7:
		l=0
		A1=7
		break
	case 0xA8:
		l=0
		A1=8
		break
	case 0xA9:
		l=0
		A1=9
		break
	case 0x80:
		regb.version=data.subarray(i+2, i+2+l).toString()
		break
//	case 0x82:
//		regb.first_registration_date=data.subarray(i+2, i+2+l).toString()
//		break
	case 0x96:
		regb.s_hm_nal_vozidla1=data.subarray(i+2, i+2+l).toString()
		break
	case 0x97:
		regb.s_hm_nal_vozidla2=data.subarray(i+2, i+2+l).toString()
		break
	case 0x98:
		regb.vehicle_category=data.subarray(i+2, i+2+l).toString()
		break
	case 0x99:
		regb.axies_number=data.subarray(i+2, i+2+l).toString()
		break
	case 0x9A:
		regb.gauge_wheeltrack=data.subarray(i+2, i+2+l).toString()
		break
	case 0x9B:
		regb.pull_braging=data.subarray(i+2, i+2+l).toString()
		break
	case 0x9C:
		regb.pull_non_braging=data.subarray(i+2, i+2+l).toString()
		break
	case 0x9D:
		regb.rpm_maximum=data.subarray(i+2, i+2+l).toString()
		break
	case 0x9E:
		regb.engine_id=data.subarray(i+2, i+2+l).toString()
		break
/*
	case 0x83:
		if (!rega.user) rega.user={}
		rega.user.legal_name=data.subarray(i+2, i+2+l).toString()
		break
	case 0x84:
		if (!rega.user) rega.user={}
		rega.user.first_name=data.subarray(i+2, i+2+l).toString()
		break
	case 0x85:
		if (!rega.user) rega.user={}
		rega.user.address=data.subarray(i+2, i+2+l).toString()
		break
	case 0x86:
		if (!rega.user) rega.user={}
		rega.user.role=data.subarray(i+2, i+2+l).toString()
		break
*/
	case 0x83:
                switch(A1) {
		   case 7:
			if (!regb.owner) regb.owner={}
			regb.owner.legal_name=data.subarray(i+2, i+2+l).toString()
			break
		   default:
//			console.log('Unknown3 tag [',A1.toString(16),',',TAG.toString(16),',',TAG2.toString(16),']')
			break

		}
		break

	case 0x84:
                switch(A1) {
		   case 7:
			if (!regb.owner) regb.owner={}
			regb.owner.first_name=data.subarray(i+2, i+2+l).toString()
			break
		   default:
//			console.log('Unknown3 tag [',A1.toString(16),',',TAG.toString(16),',',TAG2.toString(16),']')
			break

		}
		break
	case 0x85:
                switch(A1) {
		   case 7:
			if (!regb.owner) regb.owner={}
			regb.owner.address=data.subarray(i+2, i+2+l).toString()
			break
		   default:
//			console.log('Unknown3 tag [',A1.toString(16),',',TAG.toString(16),',',TAG2.toString(16),']')
			break

		}
		break
	case 0x86:
                switch(A1) {
		   case 7:
			if (!regb.owner) regb.owner={}
			regb.owner.role=data.subarray(i+2, i+2+l).toString()
			break
		   default:
//			console.log('Unknown3 tag [',A1.toString(16),',',TAG.toString(16),',',TAG2.toString(16),']')
			break

		}
		break
	case 0x9F:
                switch(TAG2) {
		   case 0x1f:
			if (!regb.axle) regb.axle=[0]
			if (!regb.axle[1]) regb.axle[1]={}
			regb.axle[1].id=1
			regb.axle[1].max_weight=data.subarray(i+2, i+2+l).toString()
			break
		   case 0x20:
			if (!regb.axle) regb.axle=[0]
			if (!regb.axle[2]) regb.axle[2]={}
			regb.axle[2].id=2
			regb.axle[2].max_weight=data.subarray(i+2, i+2+l).toString()
			break
		   case 0x21:
			if (!regb.axle) regb.axle=[0]
			if (!regb.axle[3]) regb.axle[3]={}
			regb.axle[3].id=3
			regb.axle[3].max_weight=data.subarray(i+2, i+2+l).toString()
			break
		   case 0x22:
			if (!regb.axle) regb.axle=[0]
			if (!regb.axle[4]) regb.axle[4]={}
			regb.axle[4].id=4
			regb.axle[4].max_weight=data.subarray(i+2, i+2+l).toString()
			break
		   case 0x23:
			if (!regb.axle) regb.axle=[0]
			if (!regb.axle[5]) regb.axle[5]={}
			regb.axle[5].id=5
			regb.axle[5].max_weight=data.subarray(i+2, i+2+l).toString()
			break
		   case 0x24:
			regb.color=data.subarray(i+2, i+2+l).toString()
			break
		   case 0x25:
			regb.max_construct_speed=data.subarray(i+2, i+2+l).toString()
			break
		   case 0x26:
			if (!regb.noise) regb.noise=[0]
			if (!regb.noise[1]) regb.noise[1]={}
			regb.noise[1].id=1
			regb.noise[1].value=data.subarray(i+2, i+2+l).toString()
			break
		   case 0x27:
			if (!regb.noise) regb.noise=[0]
			if (!regb.noise[2]) regb.noise[2]={}
			regb.noise[2].id=2
			regb.noise[2].value=data.subarray(i+2, i+2+l).toString()
			break
		   case 0x28:
			if (!regb.noise) regb.noise=[0]
			if (!regb.noise[3]) regb.noise[3]={}
			regb.noise[3].id=3
			regb.noise[3].value=data.subarray(i+2, i+2+l).toString()
			break
		   case 0x29:
			if (!regb.emissions) regb.emissions={}
			regb.emissions.co=data.subarray(i+2, i+2+l).toString()
			break
		   case 0x2A:
			if (!regb.emissions) regb.emissions={}
			regb.emissions.hc=data.subarray(i+2, i+2+l).toString()
			break
		   case 0x2B:
			if (!regb.emissions) regb.emissions={}
			regb.emissions.nox=data.subarray(i+2, i+2+l).toString()
			break
		   case 0x2C:
			if (!regb.emissions) regb.emissions={}
			regb.emissions.hcnox=data.subarray(i+2, i+2+l).toString()
			break
		   case 0x2D:
			if (!regb.emissions) regb.emissions={}
			regb.emissions.dbg_part=data.subarray(i+2, i+2+l).toString()
			break
		   case 0x2E:
			if (!regb.emissions) regb.emissions={}
			regb.emissions.dbg_abs=data.subarray(i+2, i+2+l).toString()
			break
		   case 0x2F:
			if (!regb.emissions) regb.emissions={}
			regb.emissions.co2=data.subarray(i+2, i+2+l).toString()
			break
		   case 0x30:
			if (!regb.consumption) regb.consumption={}
			regb.consumption.combined=data.subarray(i+2, i+2+l).toString()
			break
		   case 0x31:
			if (!regb.consumption) regb.consumption={}
			regb.consumption.dbg_ec_kat=data.subarray(i+2, i+2+l).toString()
			break
		   case 0x32:
			if (!regb.consumption) regb.consumption={}
			regb.consumption.tank_volume=data.subarray(i+2, i+2+l).toString()
			break
		   default:
//			console.log('Unknown2 tag [',TAG.toString(16),',',TAG2.toString(16),']')
			break

		}
		break
	default:
//		console.log('Unknown tag [',A1.toString(16),',',TAG.toString(16),',',TAG2.toString(16),']')
		break
     }


     i=i+l+2
  }

//  delete regb.owner[0]

//  regb.owner.shift()
  regb.axle.shift()
  regb.noise.shift()
  eVRC_data.RegistrationB=regb
  delete eVRC_data.raw_data_b

}



const readData = async (reader, protocol, withPhoto, callback) => {
  try {
   eVRC_data = {} // CLEAR PREVIOUSE DATA

   callback({ status: STATUS.START })

   callback({ status: STATUS.READING, obj: { step: 1, of: 8, message: 'Initialising Application by ID' }})
   data = await sendCommand(reader, adpu.CMD_INIT_AID, protocol)
   callback({ status: STATUS.READING, obj: { step: 2, of: 8, message: 'Application initialised' }})

   data = await sendCommand(reader, adpu.CMD_CD_DOCUMENT_NAME, protocol)
   raw_name_data = await sendCommand(reader, adpu.CMD_GET_FILE, protocol)
   callback({ status: STATUS.READING, obj: { step: 3, of: 8, message: 'Getted Document Name'}}) //.toString('hex') }})
   eVRC_data.raw_name_data=raw_name_data
   decodeDocumentData()
   




   callback({ status: STATUS.READING, obj: { step: 4, of: 8, message: 'Getted registration envelope A'}}) //.toString('hex') }})

   data = await sendCommand(reader, adpu.CMD_CD_REGISTRATION_A, protocol)

   raw_data_a = await sendCommand(reader, [[0x00,0xB0,0x00,0x00,0x00]], protocol)

   if (Buffer.byteLength(raw_data_a)==256){

      raw_data_aa = await sendCommand(reader, [[0x00,0xB0,0x01,0x00,00]], protocol)

      var list = [raw_data_a, raw_data_aa]
      raw_data_a = Buffer.concat(list);
   }


   callback({ status: STATUS.READING, obj: { step: 5, of: 8, message: 'Parsing registration envelope A'}}) //.toString('hex') }})
   eVRC_data.raw_data_a=raw_data_a
   eVRC_data.raw_data_a_size=Buffer.byteLength(raw_data_a)
   decodeRegistrationA()
   delete eVRC_data.raw_data_a_size

//   delete eVRC_data.RegistrationA






   callback({ status: STATUS.READING, obj: { step: 6, of: 8, message: 'Getted registration envelope B'}}) //.toString('hex') }})

   data = await sendCommand(reader, adpu.CMD_CD_REGISTRATION_B, protocol)

   raw_data_b = await sendCommand(reader, [[0x00,0xB0,0x00,0x00,0x00]], protocol)
//   console.log(raw_data_b)

   if (Buffer.byteLength(raw_data_b)==256){

      raw_data_bb = await sendCommand(reader, [[0x00,0xB0,0x01,0x00,00]], protocol)

      var list = [raw_data_b, raw_data_bb]
      raw_data_b = Buffer.concat(list);
   }


   callback({ status: STATUS.READING, obj: { step: 7, of: 8, message: 'Parsing registration envelope B'}}) //.toString('hex') }})
   eVRC_data.raw_data_b=raw_data_b
//   eVRC_data.raw_data_b_size=Buffer.byteLength(raw_data_b)
//   console.log('data_b ',eVRC_data.raw_data_b)
//   console.log('data_b2 ',eVRC_data.raw_data_b.toString())
   

   decodeRegistrationB()


   eVRC_data.Registration={...eVRC_data.RegistrationA, ...eVRC_data.RegistrationB}
   delete eVRC_data.RegistrationA
   delete eVRC_data.RegistrationB
//   delete eVRC_data.RegistrationA




   
   callback({ status: STATUS.COMPLETE, obj: eVRC_data})
  } 
  catch(e) {
    callback({ status: STATUS.ERROR, obj: e})
  }

  reader.disconnect(reader.SCARD_LEAVE_CARD, err => {
      if (err) {
          return
      }
  })

}




const sendCommand = async (reader, command, protocol) => {
  let data = null
  for(let i in command) {
//    console.log('CMD ', command[i])
    data = await transmit(reader, command[i], protocol)
    CW=data.slice(Buffer.byteLength(data)-2,Buffer.byteLength(data));
    data=data.slice(0,Buffer.byteLength(data)-2);
//    console.log('DATA ', data)
  }
  return data
}



const transmit = async (reader, command, protocol) => {
  return new Promise((resolve, reject) => {
    reader.transmit(Buffer.from(command), 1024, protocol, (err, data) => {
      if(err) {
    	setTimeout(() => {
          reject(err)
    	}, 1);
      }
      else {
    	setTimeout(() => {
          resolve(data)
    	}, 1);
      }
    })
  })
}

module.exports = {
  readData,
  STATUS
}