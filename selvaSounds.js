//this is going to be an $ajax routine that pulls the sound files out of a directory

var selva = {
	
sounds : [

			{name: "_MODPULSERAY_01.M--Cartoon Insect.mp3"}, 
			{name: "45 CMPT DataTran Crix Sweetener SUP01_45.02.mp3"},
			{name:"Att Electronic Phone Ring.M for cicada.mp3"},
			{name:"bwire Steady Printer For Barb Wire Hybrid Insect_BWBEEP.M.mp3"},
			{name:"CA Crix Beeper From 6010-20-2_6BE.M.mp3"},
			{name:"Comedy, Bubble-DulComedy-Bing-High_BIRD_CYBIN.mp3"},
			{name:"Comedy, Rattle - Bubbly R.M Insect.mp3"},
			{name:"Comedy, Rattle - Space RatchetM Cicada.mp3"},
			{name:"Comedy, Rattle - Space__1.M Raspy Cicada.mp3"},
			{name:"Comedy, Rattle - Space__2Cicada.M.mp3"},
			{name:"Comedy, Rattle - Space__3.M Higher Bird Cicada.mp3"},
			{name:"Comedy, Warble - Saw - Bugs Swarm Rain Forest.mp3"},
			{name:"Computer Signature Beep For Parrot Speaks.mp3"},
			{name:"Critters 4 Card-reader El.M.mp3"},
			{name:"David Farmer Bug Zapper_da.mp3"},
			{name:"E2 Interesting Sh Telemet.M.mp3"},
			{name:"Electronic Baby Spider Ch.M.mp3"},
			{name: "Electronic Baby Spider__1.M.mp3"}, 
			{name: "Electronic Cartoon Fx For.M.mp3"},
			{name:"Electronic Fx For dream House.mp3"},
			{name:"Electronic Telemtry Beep -- Amusement Park Bird.mp3"},
			{name:"Electronic Tone_KOLRTON2.M.mp3"},
			{name:"Extracted From Other Comb.M.mp3"},
			{name:"Four Complex Beeps_4BEEPS.M.mp3"},
			{name:"Graphics Appear For Max B.M.mp3"},
			{name:"H3000 Upward Warble_HUPWB01.mp3"},
			{name:"H3000 Warble_HWARB01.mp3"},
			{name:"Hong Kong Fire Dept Sos B.M - Chattering Birds Loop.mp3"},
			{name:"Hovering, Glowing Tone__1.M.mp3"},
			{name:"Loop Of Electronic'focus'.M.mp3"},
			{name:"Looping Sound File_A-136.mp3"},

//should be thirty entries up above; should go back and add more sounds at some point


			{name: "_MODPULSERAY_01.M -- Cartoon Insect.mp3"}, 
			{name: "45 CMPT DataTran Crix Sweetener SUP01_45.02.mp3"},
			{name:"Att Electronic Phone Ring.M for cicada.mp3"},
			{name:"bwire Steady Printer For Barb Wire Hybrid Insect_BWBEEP.M.mp3"},
			{name:"CA Crix Beeper From 6010-20-2_6BE.M.mp3"},
			{name:"Comedy, Bubble - DulComedy, Bing - High_BIRD_CYBIN.M.mp3"},
			{name:"Comedy, Rattle - Bubbly R.M Insect.mp3"},
			{name:"Comedy, Rattle - Space RatchetM Cicada.mp3"},
			{name:"Comedy, Rattle - Space__1.M Raspy Cicada.mp3"},
			{name:"Comedy, Rattle - Space__2Cicada.M.mp3"},
			{name:"Comedy, Rattle - Space__3.M Higher Bird Cicada.mp3"},
			{name:"Comedy, Warble - Saw - Bugs Swarm Rain Forest.mp3"},
			{name:"Computer Signature Beep For Parrot Speaks.mp3"},
			{name:"Critters 4 Card-reader El.M.mp3"},
			{name:"David Farmer Bug Zapper_da.mp3"},
			{name:"E2 Interesting Sh Telemet.M.mp3"},
			{name:"Electronic Baby Spider Ch.M.mp3"},
			{name: "Electronic Baby Spider__1.M.mp3"}, 
			{name: "Electronic Cartoon Fx For.M.mp3"},
			{name:"Electronic Fx For 'dream House'.mp3"},
			{name:"Electronic Telemtry Beep -- Amusement Park Bird.mp3"},
			{name:"Electronic Tone_KOLRTON2.M.mp3"},
			{name:"Extracted From Other Comb.M.mp3"},
			{name:"Four Complex Beeps_4BEEPS.M.mp3"},
			{name:"Graphics Appear For Max B.M.mp3"},
			{name:"H3000 Upward Warble_HUPWB01.mp3"},
			{name:"H3000 Warble_HWARB01.mp3"},
			{name:"Hong Kong Fire Dept Sos B.M - Chattering Birds Loop.mp3"},
			{name:"Hovering, Glowing Tone__1.M.mp3"},
			{name:"Loop Of Electronic'focus'.M.mp3"},
			{name:"Looping Sound File_A-136.mp3"},


	]
}			















// David Farmer Bug Zapper (da.mp3
// Digiffects Synth Beeps_DS.M.mp3
// E2 Electronic Beeps From_.M.mp3
// E2 Electronic Screen Blip.M.mp3
// E2 Interesting Sh Telemet.M.mp3
// E2 Prophet V Telemetry So.M.mp3
// E2 Repeated Electronic Be.M.mp3
// Edited Beeps_WSWBPE1.M.mp3
// Electronic Baby Spider Ch.M.mp3
// Electronic Baby Spider__1.M.mp3
// Electronic Cartoon Fx For.M.mp3
// Electronic Fx For 'dream Ho.mp3
// Electronic Monitor Interf.M.mp3
// Electronic Telemtry Beep_.M.mp3
// Electronic Tone_KOLRTON2.M.mp3
// Extracted From Other Comb.M.mp3
// Four Complex Beeps_4BEEPS.M.mp3
// Graphics Appear For Max B.M.mp3
// H3000 Upward Warble_HUPWB01.mp3
// H3000 Warble_HWARB01.mp3
// Hong Kong Fire Dept Sos B.M.mp3
// Hong Kong Fire Dept Sos_1.M.mp3
// Hovering, Glowing Tone__1.M.mp3
// Loop Of Electronic'focus'.M.mp3
// Looping Sound File_A-136.mp3
// Metal Detector Electronic.M.mp3
// Misc. Sci-fi Loop_TSTLOP1.M.mp3
// Misc. Sci-fi Loop_TSTLO_1.M.mp3
// Misc. Sci-fi Loop_TSTLO_2.M.mp3
// Misc. Sci-fi Loop_TSTLO_4.M.mp3
// Misc. Sci-fi Loop_TSTLO_5.M.mp3
// Misc. Sci-fi Loop_TSTLO_6.M.mp3
// Misc. Sci-fi Loop_TSTLO_7.M.mp3
// Misc. Sci-fi Loop_TSTLO_8.M.mp3
// Misc. Sci-fi Loop_TSTLO_9.M.mp3
// Misc. Sci-fi Loop_TSTL_10.M.mp3
// Misc. Sci-fi Loop_TSTL_11.M.mp3
// Misc. Sci-fi Loop_TSTL_12.M.mp3
// Misc. Sci-fi Loop_TSTL_14.M.mp3
// Misc. Sci-fi Loop_TSTL_15.M.mp3
// Misc. Sci-fi Loop_TSTL_16.M.mp3
// Modulated Voice Over Radi.M.mp3
// Ooo Aaa Synth Sound_ALIEN.M.mp3
// Pl 2 Console Intference H.M.mp3
// Radio Waves_A-270.M.mp3
// Rev Loop Of Elecarc For B.M.mp3
// Sci Fi Scanner Or Ship In.M.mp3
// Sci Fi Scanner_HBEEP6.M.mp3
// Sci-Fi_Scifi MechanicaMOD.M.mp3
// Single Cardinal (pitch Up.M.mp3
// Strange Synthy Thing For_.M.mp3
// Wacky Bell Tree Ver.2_S-B.M.mp3
// _LCDALAR_01.M.mp3
// _MODPULSE_01.M.mp3
// output.txt




