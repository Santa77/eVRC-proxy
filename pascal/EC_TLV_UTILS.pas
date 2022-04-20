unit EC_TLV_UTILS;

interface

const
   S_ATR_TECHNICAK      ='3BD21802C10A31FE58C80D51';
   S_ATR_TECHNICAK2     ='3BD218008131FE58C90114';
   S_ATR_VISA           ='3BE600FF8131FE454449203032566B';

type

   TA2 = record                //TLV QA/3M/R2    - udaje osoby/firmy
     s_priezvisko:    string;  //TLV QA/3M/R2/I3 - Priezvisko alebo obchodné meno
     s_ine:           string;  //TLV QA/3M/R2/I4 - Iné mená alebo iniciály (nepovinné)
     s_adresa:        string;  //TLV QA/3M/R2/I5 - Adresa v èlenskom štáte
   end;

   TA1 = record                //TLV QA/R1 - osobne udaje drzitela
     r_drzitel:       TA2;     //TLV QA/3M/R2
     s_rola:          string;  //TLV QA/3M/I6
   end;

   TA3 = record                //TLV QA/R3 - vozidlo
     s_znacka:        string;  //TLV QA/R3/I7
     s_typ:           string;  //TLV QA/R3/I8
     s_oznacenie:     string;  //TLV QA/R3/I9
   end;

   TA5 = record
     s_objem:         string;  //TLV QA/R5/90
     s_max_vykon:     string;  //TLV QA/R5/91
     s_palivo:        string;  //TLV QA/R5/92
   end;

   TA6 = record
     s_sedenie:       string;   //TLV QA/R6/94
     s_statie:        string;   //TLV QA/R6/95
   end;

   TObalkaA = record
     s_app_id:        string;  //TLV 78/4F
     s_verzia:        string;  //TLV QA/I0
     s_stat:          string;  //TLV QA/e333
     s_stat2:         string;  //TLV QA/e334
     s_organ:         string;  //TLV QA/e335
     s_sub_organ:     string;  //TLV QA/e336
     s_charset:       string;  //TLV QA/e337
     s_id_dokladu:    string;  //TLV QA/e338
     s_ecv:           string;  //TLV QA/I1
     s_d_p_reg:       string;  //TLV QA/I2
     r_osobne_udaje:  TA1;     //TLV QA/R1
     r_vozidlo:       TA3;     //TLV QA/R3
     s_ICV:           string;  //TLV QA/IA
     s_hmotnost_max:  string;  //TLV QA/R4/IB
     s_hmotnost_pohot:string;  //TLV QA/IC
     s_platnost:      string;  //TLV QA/ID
     s_d_reg:         string;  //TLV QA/IE
     s_tschval:       string;  //TLV QA/IF
     r_motor:         TA5;     //TLV QA/R5
     s_vykon_hm:      string;  //TLV QA/93
     r_miesta:        TA6;     //TLV QA/R6
   end;

   TObalkaB = record
     s_app_id:                 string;  //TLV 78/4F
     s_verzia:                 string;  //TLV QB/I0
     r_osobne_udaje_A7:        TA2;     //TLV QB/3M/R7
     r_osobne_udaje_A8:        TA2;     //TLV QB/3M/R8
     r_osobne_udaje_A9:        TA2;     //TLV QB/3M/R9
     s_kategoria_vozidla:      string;  //TLV QB/98
     s_pocet_naprav:           string;  //TLV QB/99
     s_razvor:                 string;  //TLV QB/9A
     s_hm_nal_vozidla1:        string;  //TLV QB/R4/96
     s_hm_nal_vozidla2:        string;  //TLV QB/R4/e3
     s_vaha_napr1:             string;  //TLV QB/RD/e31F
     s_vaha_napr2:             string;  //TLV QB/RD/e320
     s_vaha_napr3:             string;  //TLV QB/RD/e321
     s_vaha_napr4:             string;  //TLV QB/RD/e322
     s_vaha_napr5:             string;  //TLV QB/RD/e323
     s_tahane_brzdene:         string;  //TLV QB/RE/9B
     s_tahane_nebrzdene:       string;  //TLV QB/RE/9C
     s_max_kr_otacky:          string;  //TLV QB/R5/9D
     s_cislo_motora:           string;  //TLV QB/R5/9E
     s_farba:                  string;  //TLV QB/e324
     s_max_kostrukcna_rych:    string;  //TLV QB/e325
     s_hluk1:                  string;  //TLV QB/RM/e326
     s_hluk2:                  string;  //TLV QB/RM/e327
     s_hluk3:                  string;  //TLV QB/RM/e328
     s_emis_co:                string;  //TLV QB/B0/e329
     s_emis_hc:                string;  //TLV QB/B0/e32A
     s_emis_nox:               string;  //TLV QB/B0/e32B
     s_emis_hcnox:             string;  //TLV QB/B0/e32C
     s_emis_d_part:            string;  //TLV QB/B0/e32D
     s_emis_d_abs:             string;  //TLV QB/B0/e32E
     s_emis_co2:               string;  //TLV QB/B0/e32F
     s_spotreba_komb:          string;  //TLV QB/B0/e330
     s_spotreba_ec_kat:        string;  //TLV QB/B0/e331
     s_nadrz:                  string;  //TLV QB/B0/e332
   end;


   TTechnicak = record
     l_Nacitane:      boolean;
     s_ATR:           string;
     s_Doklad:        string;
     s_Krajina:       string;
     r_Obalka_A:      TObalkaA;  //EF.Registration_A ‚D001‘
     r_Obalka_B:      TObalkaB;  //EF.Registration_B ‚D011‘
   end;

implementation

end.
