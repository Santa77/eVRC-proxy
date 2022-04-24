# eVRC-proxy
eVRC-proxy is local REST API service to read Electronic Vehicle Registration Card (eVRC) issued at EU.

Tested on SK eVRCs

## how to run
```
node start
```

## how to build binary
```
pkg .
```

## how to use
```
let xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:26453/api/technicak");

xhr.onreadystatechange = function () {
   if (xhr.readyState === 4 && xhr.status == 200) {
      var jsonResponse = JSON.parse(xhr.responseText);
      console.log(jsonResponse);
   }};

xhr.send();
```

In reply you will get JSON object with data from card

```
{
  s_Document_Name: 'Registracne osvedcenie pre vozidlo',
  s_Country: 'Slovenska Republika',
  Registration: {
    first_registration_date: '20080225',
    version: '0',
    document: {
      issuing_state: 'Slovenska republika',
      issuing_state_desc: '',
      competent_authority: 'Ministerstvo vnutra Slovenskej republiky',
      issuing_authority: '',
      charset: '00',
      unambiguous_number: 'ALK97654'
    },
    registration_number: 'ZA123AA',
    user: {
      legal_name: 'HornaDolna s.r.o.',
      first_name: '',
      address: 'Horna Dolna, Hlavna 2',
      role: '01'
    },
    description: {
      brand: 'PORSCHE',
      model: 'CAYENNE GTS 9PA/EP22/-',
      commercial_description: 'PORSCHE'
    },
    VIN: 'WP1234567890-1234',
    max_permissible_laden_mass: '3080 kg',
    mass: '2320 kg',
    expiry_date: '20230121',
    issuing_date: '20080225',
    type_approval_number: 'e13*2001/*116*0089*08',
    engine: {
      engine_capacity: '4806.0 cm3',
      max_net_power: '298.00 kW',
      fuel_type: 'BA 98 B'
    },
    power_weight_ratio: '',
    seats: { seats_number: '5', standing_places_number: '0' },
    owner: {
      legal_name: 'VUB Leasing, a.s.',
      first_name: '',
      address: 'Bratislava - Ruzinov, Mlynske Nivy 1'
    },
    s_hm_nal_vozidla1: '',
    s_hm_nal_vozidla2: '6580 kg',
    vehicle_category: 'M1G',
    axies_number: '2',
    gauge_wheeltrack: '2855 mm',
    axle: [
      { id: 1, max_weight: '1455 kg' },
      { id: 2, max_weight: '1680 kg' },
      { id: 3, max_weight: '' },
      { id: 4, max_weight: '' },
      { id: 5, max_weight: '' }
    ],
    pull_braging: '3500 kg',
    pull_non_braging: '750 kg',
    rpm_maximum: '6500 min-1',
    engine_id: '4M1234V',
    color: 'ZLTA METALIZA - ZLATA/METALLIC GOLDEN YELLOW',
    max_construct_speed: '251 km.h-1',
    noise: [
      { id: 1, value: '80.0 dB(A)' },
      { id: 2, value: '4000 min-1' },
      { id: 3, value: '75.0 dB(A)' }
    ],
    emissions: {
      co: '.2250 g.km-1',
      hc: '.0640 g.km-1',
      nox: '.3230 g.km-1',
      hcnox: '',
      dbg_part: '',
      dbg_abs: '',
      co2: '310 g.km-1'
    },
    consumption: {
      combined: '13.9 l.100 km-1',
      dbg_ec_kat: '51-02',
      tank_volume: '100.0 l'
    }
  }
}
```


Coskoro pribudnu aj zdrojove texty plus releases pre jednotlive OS...