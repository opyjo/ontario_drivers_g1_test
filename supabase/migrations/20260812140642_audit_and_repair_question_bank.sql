begin;

-- Give every visual question useful taxonomy. The previous import left all
-- sign categories empty and marked every item as medium difficulty.
update public.signs_questions
set
  category = case
    when id = any (array[20, 95, 96]) then 'Temporary conditions signs'
    when id = any (array[25, 48, 49, 50, 67, 68, 69]) then 'Information and road-user signals'
    when id = any (array[1,2,4,5,6,8,9,10,18,19,27,33,34,35,36,37,38,44,45,46,47,51,52,53,54,55,56,57,59,61,62,64,65,70,71,93,94,97,99,100]) then 'Warning signs'
    else 'Regulatory signs'
  end,
  subcategory = case
    when id = any (array[20, 95, 96]) then 'Construction and temporary conditions'
    when id = any (array[48, 49, 50]) then 'Cyclist hand signals'
    when id = any (array[25, 67, 68, 69]) then 'Information and direction'
    when id = any (array[8, 44, 64, 65, 66]) then 'School zones and school buses'
    when id = any (array[1,10,52,53,93]) then 'Advance warning'
    when id = any (array[11,12,13,14,17,21,23,29,41,43,75,79,80,81,82,83,89,98]) then 'Prohibitions and stopping'
    when id = any (array[30,31,32,40,58,60,72,73]) then 'Permitted uses and reserved lanes'
    else 'Road conditions and required movements'
  end,
  difficulty_level = case
    when id = any (array[13,14,21,29,32,58,67,76,84,89]) then 'easy'
    when id = any (array[16,18,24,28,37,39,41,42,48,49,50,60,63,69,82,83,90,91,92,95,100]) then 'hard'
    else 'medium'
  end,
  is_frequently_tested = id = any (
    array[1,2,7,8,9,10,12,13,14,17,19,20,21,27,29,33,34,35,36,44,53,55,57,61,64,65,66,79,80,89,93,100]
  );

-- Improve rule metadata without changing the public access model.
update public.rules_questions
set
  subcategory = category,
  difficulty_level = case
    when category ~* '(demerit|suspension|disqualified|impair|alcohol|breath|collision|accident|licen[cs]|G1|G2|distance|metre|speed limit|headlight|railway|seatbelt)' then 'hard'
    when category ~* '(defensive|animal|fatigue|weather|fog|winter|hydroplan|parking lights|road signs|traffic lights)' then 'easy'
    else 'medium'
  end,
  is_frequently_tested = category ~* '(seatbelt|traffic light|sign|emergency vehicle|headlight|speed|freeway|streetcar|school bus|suspension|demerit|passing|collision|accident|sharing|pedestrian|cyclist|right of way|intersection)';

-- Rules corrections verified against the current Official MTO Driver's
-- Handbook and current Ontario collision-reporting requirements.
update public.rules_questions set
  question_text = 'How should you determine the speed limit in a school zone?',
  option_a = 'Assume it is always 30 km/h',
  option_b = 'Follow the posted limit and any times or flashing-light conditions shown',
  option_c = 'Use the same speed as the fastest vehicle',
  option_d = 'Assume the normal highway limit applies',
  correct_option = 'B',
  explanation = 'School-zone limits are posted and may apply only at stated times or while lights are flashing. Where no limit is posted, Ontario''s general unposted limits apply.',
  category = 'Speed Limits'
where id = 21;

update public.rules_questions set
  question_text = 'If your vehicle begins to skid, where should you steer?',
  option_a = 'Toward the shoulder immediately',
  option_b = 'Straight ahead regardless of the road',
  option_c = 'In the direction you want the vehicle to go',
  option_d = 'Sharply in the opposite direction',
  correct_option = 'C',
  explanation = 'Ease off the accelerator and steer smoothly in the direction you want the vehicle to go. Avoid hard braking or sudden steering.',
  category = 'Emergency Situations'
where id = 33;

update public.rules_questions set
  question_text = 'When may you use the right shoulder to pass another vehicle?',
  option_a = 'Whenever traffic is moving slowly',
  option_b = 'To pass any vehicle on a two-lane road',
  option_c = 'Never, even when the vehicle ahead is turning left',
  option_d = 'Only to pass a vehicle turning left, and only when the shoulder is paved',
  correct_option = 'D',
  explanation = 'Ontario permits driving on the right shoulder to pass a vehicle turning left only when the shoulder is paved. Passing on the left shoulder is not permitted.',
  category = 'Passing'
where id = 35;

update public.rules_questions set
  question_text = 'About how often should you check your mirrors while driving?',
  option_a = 'Only before turning',
  option_b = 'About every five seconds',
  option_c = 'Every five minutes',
  option_d = 'Only when another vehicle honks',
  correct_option = 'B',
  explanation = 'Develop a routine of checking your mirrors about every five seconds while continuing to scan ahead and to both sides.',
  category = 'Mirrors'
where id = 54;

update public.rules_questions set
  question_text = 'What is the safest response when a roadway is flooded?',
  option_a = 'Drive through slowly in a low gear',
  option_b = 'Follow a larger vehicle through the water',
  option_c = 'Stop in the traffic lane and wait',
  option_d = 'Avoid the flooded section and take another route or wait for the water to recede',
  correct_option = 'D',
  explanation = 'Do not drive through a flooded roadway. Water can hide road damage, move a vehicle, or cause loss of control.',
  category = 'Weather Conditions'
where id = 73;

update public.rules_questions set
  question_text = 'Which drivers are considered novice drivers under Ontario''s graduated licensing system?',
  option_a = 'Only drivers younger than 18',
  option_b = 'Drivers holding a G1 or G2 licence',
  option_c = 'Anyone who has owned a vehicle for less than two years',
  option_d = 'Only drivers taking an approved course',
  correct_option = 'B',
  explanation = 'G1 and G2 licence holders are novice drivers and remain subject to graduated-licensing conditions.',
  category = 'Licensing'
where id = 91;

update public.rules_questions set
  question_text = 'What is the maximum speed where no speed limit is posted outside a city, town or village?',
  option_a = '50 km/h',
  option_b = '60 km/h',
  option_c = '80 km/h',
  option_d = '100 km/h',
  correct_option = 'C',
  explanation = 'Where no speed limit is posted, the maximum is 50 km/h in cities, towns and villages and 80 km/h elsewhere.',
  category = 'Speed Limits'
where id = 95;

update public.rules_questions set
  question_text = 'What should you do when a police officer directs you to pull over?',
  option_a = 'Stop immediately in your current traffic lane',
  option_b = 'Speed up until you find a parking lot',
  option_c = 'Ignore the officer if you believe you did nothing wrong',
  option_d = 'Signal, move as far right as is safely practical, and come to a safe stop',
  correct_option = 'D',
  explanation = 'Obey the officer, signal, and pull as far to the right as you safely can before stopping. Follow any specific directions the officer gives.',
  category = 'Police Interactions'
where id = 113;

update public.rules_questions set
  question_text = 'What is your responsibility before driving a vehicle on an Ontario road?',
  option_a = 'Make sure it is registered, insured and safe to operate',
  option_b = 'Check it only when a warning light appears',
  option_c = 'Rely on the previous driver''s inspection',
  option_d = 'Have an emissions test before every plate renewal',
  correct_option = 'A',
  explanation = 'The vehicle must be registered, insured and maintained in a safe condition. Ontario ended mandatory Drive Clean tests for light-duty passenger vehicles in 2019.',
  category = 'Vehicle Safety'
where id = 116;

update public.rules_questions set
  question_text = 'Which documents must a driver produce when requested by a police officer?',
  option_a = 'Only an insurance card',
  option_b = 'Only the vehicle permit',
  option_c = 'Only a driver''s licence',
  option_d = 'Driver''s licence, vehicle permit and proof of insurance',
  correct_option = 'D',
  explanation = 'A driver must immediately provide their driver''s licence, vehicle permit or copy, and proof of insurance when an officer requests them.',
  category = 'Required Documents'
where id = 125;

update public.rules_questions set
  question_text = 'When must a collision be reported to police because of injury or property damage?',
  option_a = 'Only when a vehicle cannot be driven',
  option_b = 'When anyone is injured or total property damage appears to exceed $5,000',
  option_c = 'Only when damage exceeds $500',
  option_d = 'Every time two vehicles touch',
  correct_option = 'B',
  explanation = 'Report a collision when anyone is injured or dies, or when total damage to vehicles or other property appears to exceed $5,000. Other circumstances can also require police attendance.',
  category = 'Collision Reporting'
where id = 126;

update public.rules_questions set
  question_text = 'When turning at an intersection, what must you do for a pedestrian lawfully in the crosswalk?',
  option_a = 'Yield and wait until your path is clear',
  option_b = 'Honk so the pedestrian stops',
  option_c = 'Proceed first because the light is green',
  option_d = 'Pass behind the pedestrian without slowing',
  correct_option = 'A',
  explanation = 'A green light does not remove your duty to yield. Check the crosswalk and wait until the pedestrian is safely clear of your path.',
  category = 'Pedestrian Rights'
where id = 127;

update public.rules_questions set
  question_text = 'Which statement about driving while your licence is suspended is correct?',
  option_a = 'You may drive only to work',
  option_b = 'You may drive with a fully licensed passenger',
  option_c = 'You may drive during an emergency',
  option_d = 'You may not drive until the suspension ends and your licence is reinstated',
  correct_option = 'D',
  explanation = 'A suspended licence does not permit driving for work, emergencies or with supervision. Driving while suspended can lead to further penalties and vehicle impoundment.',
  category = 'License Suspension'
where id in (131, 132);

update public.rules_questions set
  question_text = 'What must happen before a suspended driver may drive again?',
  option_a = 'The driver must wait one week',
  option_b = 'The driver must complete the suspension and satisfy the reinstatement requirements',
  option_c = 'A fully licensed passenger must agree to supervise',
  option_d = 'The vehicle owner must give written permission',
  correct_option = 'B',
  explanation = 'Do not drive until the suspension period has ended and the licence has been properly reinstated. Paying a fine alone may not reinstate driving privileges.',
  category = 'License Reinstatement'
where id = 131;

update public.rules_questions set
  question_text = 'What must you do when facing a steady red traffic light?',
  option_a = 'Slow down and proceed if no vehicle is visible',
  option_b = 'Stop only when pedestrians are present',
  option_c = 'Come to a complete stop and wait until a permitted movement can be made safely',
  option_d = 'Treat it like a flashing yellow light',
  correct_option = 'C',
  explanation = 'Stop at the stop line, crosswalk or edge of the intersection. Proceed only when the signal or a permitted turn allows it and the way is clear.',
  category = 'Traffic Lights'
where id = 134;

update public.rules_questions set
  question_text = 'During the first six months after receiving a G2 licence, what overnight passenger limit applies to a driver aged 19 or under?',
  option_a = 'No passengers of any age from midnight to 5 a.m.',
  option_b = 'One passenger aged 19 or under from midnight to 5 a.m.',
  option_c = 'Two passengers aged 19 or under from midnight to 5 a.m.',
  option_d = 'Three passengers aged 19 or under from midnight to 5 a.m.',
  correct_option = 'B',
  explanation = 'For the first six months, a G2 driver aged 19 or under may carry no more than one passenger aged 19 or under between midnight and 5 a.m., subject to family and fully licensed-driver exemptions.',
  category = 'G2 Restrictions'
where id = 139;

update public.rules_questions set
  question_text = 'During the first six months with a G2 licence, what overnight passenger limit applies to a driver aged 19 or under?',
  option_a = 'No passengers aged 19 or under from midnight to 5 a.m.',
  option_b = 'One passenger aged 19 or under from midnight to 5 a.m.',
  option_c = 'Two passengers aged 19 or under from midnight to 5 a.m.',
  option_d = 'Up to three passengers aged 19 or under from midnight to 5 a.m.',
  correct_option = 'B',
  explanation = 'During the first six months after receiving a G2 licence, a driver aged 19 or under may carry only one passenger aged 19 or under between midnight and 5 a.m., subject to exemptions.',
  category = 'G2 Restrictions'
where id = 139;

update public.rules_questions set
  question_text = 'After six months with a G2 licence, what overnight passenger limit applies to a driver aged 19 or under?',
  option_a = 'No passengers aged 19 or under from midnight to 5 a.m.',
  option_b = 'One passenger aged 19 or under from midnight to 5 a.m.',
  option_c = 'Two passengers aged 19 or under from midnight to 5 a.m.',
  option_d = 'Up to three passengers aged 19 or under from midnight to 5 a.m.',
  correct_option = 'D',
  explanation = 'After six months and until the driver turns 20 or earns a full G licence, up to three passengers aged 19 or under are allowed between midnight and 5 a.m., subject to exemptions.',
  category = 'G2 Restrictions'
where id = 140;

update public.rules_questions set
  question_text = 'What does a no-parking sign require?',
  option_a = 'Do not leave the vehicle parked in the signed area; obey any posted times and arrows',
  option_b = 'Parking is allowed whenever traffic is light',
  option_c = 'The restriction applies only at night',
  option_d = 'The sign prohibits driving through the area',
  correct_option = 'A',
  explanation = 'A no-parking sign prohibits parking in the signed area during the posted conditions. Always check arrows, days and times shown.',
  category = 'Parking Signs'
where id = 141;

update public.rules_questions set
  question_text = 'When following another vehicle at night, when must you use low-beam headlights?',
  option_a = 'Within 30 metres',
  option_b = 'Within 60 metres',
  option_c = 'Within 150 metres',
  option_d = 'Only when the other driver flashes their lights',
  correct_option = 'B',
  explanation = 'Use low beams when following another vehicle within 60 metres. The 150-metre rule applies when meeting an oncoming vehicle.',
  category = 'Headlight Rules'
where id = 142;

update public.rules_questions set
  question_text = 'Which licence must the person accompanying a G1 driver hold?',
  option_a = 'Any G2 licence',
  option_b = 'A valid Class G or higher licence with at least four years of driving experience',
  option_c = 'Any licence held for at least one year',
  option_d = 'A motorcycle licence only',
  correct_option = 'B',
  explanation = 'The accompanying driver must hold a valid Class G or higher licence, have at least four years of driving experience, and meet the accompanying-driver blood-alcohol requirement.',
  category = 'G1 Supervision'
where id = 144;

update public.rules_questions set
  question_text = 'At a streetcar stop without a safety island, where must you stop?',
  option_a = 'At least two metres behind the rear doors',
  option_b = 'Beside the streetcar''s front door',
  option_c = 'Four metres behind the front door',
  option_d = 'Directly behind the streetcar bumper',
  correct_option = 'A',
  explanation = 'Stay at least two metres behind the rear doors while passengers are getting on or off a streetcar when there is no safety island.',
  category = 'Streetcars'
where id = 145;

update public.rules_questions set
  question_text = 'How should you choose your speed at night?',
  option_a = 'Always drive exactly 20 km/h below the posted limit',
  option_b = 'Drive fast enough to stay beside another vehicle',
  option_c = 'Use the posted limit even when visibility is poor',
  option_d = 'Drive slowly enough to stop within the distance you can see',
  correct_option = 'D',
  explanation = 'Adjust speed for visibility and never overdrive your headlights. You must be able to stop safely within the distance you can see.',
  category = 'Night Driving'
where id in (152, 188);

update public.rules_questions set
  question_text = 'What does it mean to overdrive your headlights?',
  option_a = 'Using high beams on a divided highway',
  option_b = 'Driving so fast that you cannot stop within the distance you can see',
  option_c = 'Leaving headlights on after parking',
  option_d = 'Following another vehicle with low beams',
  correct_option = 'B',
  explanation = 'You are overdriving your headlights when your stopping distance is longer than the illuminated distance ahead. Reduce speed so you can stop safely within what you can see.',
  category = 'Night Driving'
where id = 152;

update public.rules_questions set
  question_text = 'What should you do before moving out from a parked position?',
  option_a = 'Signal and move immediately',
  option_b = 'Check mirrors and blind spot, signal, and move only when safe',
  option_c = 'Honk and enter the lane without checking',
  option_d = 'Wait for another driver to wave you out',
  correct_option = 'B',
  explanation = 'Check traffic, mirrors and your blind spot, signal your intention, and pull out only when the way is clear.',
  category = 'Leaving Parking'
where id = 153;

update public.rules_questions set
  question_text = 'Which is one situation where passing on the right may be permitted?',
  option_a = 'On a multi-lane road with two or more lanes travelling in the same direction',
  option_b = 'On the unpaved left shoulder',
  option_c = 'Across a solid centre line near a hilltop',
  option_d = 'Whenever the vehicle ahead is at the speed limit',
  correct_option = 'A',
  explanation = 'Passing on the right may be permitted on multi-lane or one-way roads and in certain situations involving streetcars or left-turning vehicles. It must still be safe and legal.',
  category = 'Passing on Right'
where id = 160;

update public.rules_questions set
  question_text = 'For which passengers is the driver responsible for ensuring proper seatbelt or child-restraint use?',
  option_a = 'Only front-seat passengers',
  option_b = 'Only passengers younger than eight',
  option_c = 'All passengers under 16 years of age',
  option_d = 'Only passengers related to the driver',
  correct_option = 'C',
  explanation = 'Drivers must ensure every passenger under 16 is properly secured in a seatbelt, child car seat or booster seat as required.',
  category = 'Seatbelt Responsibility'
where id = 161;

update public.rules_questions set
  question_text = 'What should be your first consideration before making a U-turn?',
  option_a = 'Whether the vehicle has a small turning circle',
  option_b = 'Whether traffic regulations permit it and you have a clear, safe view',
  option_c = 'Whether there is a driveway nearby',
  option_d = 'Whether another driver is waiting',
  correct_option = 'B',
  explanation = 'First confirm that a U-turn is legal, then make sure you can see far enough in both directions to complete it safely without interfering with traffic.',
  category = 'U-turn Safety'
where id = 164;

update public.rules_questions set
  question_text = 'Which collision must be reported to police?',
  option_a = 'Only a collision involving two moving vehicles',
  option_b = 'A collision with injury or death, or apparent total property damage over $5,000',
  option_c = 'Only a collision on a provincial highway',
  option_d = 'Only a collision where a vehicle is towed',
  correct_option = 'B',
  explanation = 'Police reporting is required for injury or death and when total property damage appears to exceed $5,000. Other circumstances, such as suspected criminal activity, can also require police.',
  category = 'Collision Reporting'
where id in (165, 182);

update public.rules_questions set
  question_text = 'What must every driver involved in a collision do?',
  option_a = 'Leave if the vehicle can still be driven',
  option_b = 'Stop, remain at or return to the scene, and provide required information and assistance',
  option_c = 'Discuss who is at fault before exchanging information',
  option_d = 'Call a tow truck before checking for injuries',
  correct_option = 'B',
  explanation = 'A driver involved in a collision must stop, remain at or immediately return to the scene, give required information, and provide reasonable assistance.',
  category = 'Collision Responsibilities'
where id = 165;

update public.rules_questions set
  question_text = 'What blood-alcohol level must G1 and G2 drivers maintain?',
  option_a = 'Below 0.08%',
  option_b = 'Below 0.05%',
  option_c = 'Zero',
  option_d = 'Any level if accompanied by a full-G driver',
  correct_option = 'C',
  explanation = 'G1 and G2 drivers must maintain a zero blood-alcohol level whenever they drive.',
  category = 'Novice Driver Alcohol Rules'
where id in (171, 210);

update public.rules_questions set
  question_text = 'What is the only reliable way to lower the amount of alcohol in your body?',
  option_a = 'Drink coffee',
  option_b = 'Take a cold shower',
  option_c = 'Give your body time to eliminate the alcohol',
  option_d = 'Eat a large meal after drinking',
  correct_option = 'C',
  explanation = 'Only time lowers the amount of alcohol in your body. Coffee, food and cold showers do not make an impaired driver sober.',
  category = 'Impaired Driving'
where id = 171;

update public.rules_questions set
  question_text = 'Which statement about alcohol impairment is correct?',
  option_a = 'A driver can be impaired even below a 0.08 blood-alcohol concentration',
  option_b = 'A driver cannot be impaired below 0.08',
  option_c = 'Coffee immediately removes alcohol from the body',
  option_d = 'Prescription drugs cannot contribute to impairment',
  correct_option = 'A',
  explanation = 'A driver can be impaired at a blood-alcohol concentration below 0.08. Novice and young drivers are also subject to zero-alcohol requirements.',
  category = 'Impaired Driving'
where id = 172;

update public.rules_questions set
  question_text = 'How should you pass a stopped streetcar that is loading passengers at a safety island?',
  option_a = 'Stop two metres behind the rear doors',
  option_b = 'Pass the safety island at a reasonable speed and be ready for pedestrians',
  option_c = 'Pass on the left at the posted speed',
  option_d = 'Sound your horn and accelerate',
  correct_option = 'B',
  explanation = 'The two-metre stopping rule does not apply where a safety island is provided, but you must pass cautiously at a reasonable speed and watch for pedestrians.',
  category = 'Streetcars'
where id = 174;

update public.rules_questions set
  question_text = 'What should you do if your brakes fail while driving?',
  option_a = 'Shift to neutral and turn off the ignition immediately',
  option_b = 'Pump the brake pedal, shift to a lower gear, and apply the parking brake carefully',
  option_c = 'Accelerate to restore brake pressure',
  option_d = 'Leave the roadway without checking traffic',
  correct_option = 'B',
  explanation = 'Try pumping the brakes, shift to a lower gear, and use the parking brake carefully while steering toward a safe stopping place.',
  category = 'Brake Failure'
where id = 178;

update public.rules_questions set
  question_text = 'Who may legally accompany and supervise a G1 driver?',
  option_a = 'Any G2 driver with zero alcohol',
  option_b = 'A full Class G or higher driver with at least four years of experience who meets the blood-alcohol requirement',
  option_c = 'Any family member older than 18',
  option_d = 'Any driver with an out-of-province learner''s permit',
  correct_option = 'B',
  explanation = 'A G2 driver cannot be the required accompanying driver. The supervisor needs a valid Class G or higher licence and at least four years of driving experience.',
  category = 'G1 Supervision'
where id = 181;

update public.rules_questions set
  question_text = 'What can happen if someone drives while their licence is suspended?',
  option_a = 'Nothing if the trip is short',
  option_b = 'Only a warning for a first occurrence',
  option_c = 'Additional fines or jail, a longer suspension, and vehicle impoundment',
  option_d = 'The suspension ends automatically',
  correct_option = 'C',
  explanation = 'Driving while suspended is prohibited and can result in serious additional penalties, including vehicle impoundment.',
  category = 'Suspended License Penalties'
where id in (183, 200);

update public.rules_questions set
  question_text = 'What may happen to a vehicle used by someone who is driving while suspended?',
  option_a = 'It may be impounded, regardless of who owns it',
  option_b = 'Nothing if the owner did not know about the suspension',
  option_c = 'It can be driven home by the suspended driver',
  option_d = 'It is automatically transferred to the province',
  correct_option = 'A',
  explanation = 'A vehicle driven by a suspended driver may be impounded. Vehicle owners should ensure anyone using their vehicle is properly licensed.',
  category = 'Vehicle Impoundment'
where id = 200;

update public.rules_questions set
  question_text = 'A solid yellow centre line beside a broken yellow centre line means:',
  option_a = 'Passing is allowed from both directions',
  option_b = 'Passing is allowed only for traffic beside the broken line, when safe',
  option_c = 'Passing is prohibited from both directions',
  option_d = 'The lines separate lanes moving in the same direction',
  correct_option = 'B',
  explanation = 'Traffic beside the broken line may pass when the way is clear. Traffic beside the solid line must not pass.',
  category = 'Lane Markings'
where id = 193;

update public.rules_questions set
  question_text = 'When must you switch from high beams to low beams?',
  option_a = 'Only on roads without streetlights',
  option_b = 'Within 150 metres of an oncoming vehicle or within 60 metres when following',
  option_c = 'Only when another driver flashes their headlights',
  option_d = 'Whenever the posted speed is below 80 km/h',
  correct_option = 'B',
  explanation = 'Use low beams within 150 metres of an oncoming vehicle and when following another vehicle within 60 metres.',
  category = 'Headlight Rules'
where id = 195;

update public.rules_questions set
  question_text = 'What minimum following distance should you use in ideal conditions?',
  option_a = 'One car length at every speed',
  option_b = 'At least two seconds behind the vehicle ahead',
  option_c = 'Exactly three car lengths at 50 km/h',
  option_d = 'Half a second on dry pavement',
  correct_option = 'B',
  explanation = 'Use a time gap of at least two seconds in ideal conditions. Increase the gap in poor weather, behind large vehicles, or when carrying a heavy load.',
  category = 'Following Distance'
where id = 196;

update public.rules_questions set
  question_text = 'What does defensive driving involve?',
  option_a = 'Claiming the right-of-way whenever possible',
  option_b = 'Driving more slowly than all other traffic',
  option_c = 'Anticipating hazards, maintaining space, and communicating clearly',
  option_d = 'Using the horn at every intersection',
  correct_option = 'C',
  explanation = 'Defensive driving uses visibility, space and communication to anticipate mistakes and avoid collisions.',
  category = 'Defensive Driving'
where id = 197;

update public.rules_questions set
  question_text = 'If your wheels leave the paved roadway, what should you do?',
  option_a = 'Steer sharply back onto the pavement',
  option_b = 'Brake as hard as possible',
  option_c = 'Accelerate before steering back',
  option_d = 'Hold the wheel firmly, ease off the accelerator, and return gradually when under control',
  correct_option = 'D',
  explanation = 'Avoid sudden braking or steering. Reduce speed, keep control, check traffic, and steer gradually back onto the pavement when safe.',
  category = 'Loss of Vehicle Control'
where id = 201;

update public.rules_questions set
  question_text = 'What must you do before entering a highway from a private road or driveway?',
  option_a = 'Enter quickly before highway traffic reaches you',
  option_b = 'Yield the right-of-way to vehicles and pedestrians on the highway',
  option_c = 'Sound the horn and take the right-of-way',
  option_d = 'Stop only when a sign is posted',
  correct_option = 'B',
  explanation = 'Traffic entering from a private road or driveway must yield to traffic and pedestrians already using the highway.',
  category = 'Highway Entry from Private Road'
where id = 202;

update public.rules_questions set
  question_text = 'What is a common cause of skids?',
  option_a = 'Driving too slowly for traffic',
  option_b = 'Driving too fast for the road and weather conditions',
  option_c = 'Checking mirrors frequently',
  option_d = 'Using low beams in fog',
  correct_option = 'B',
  explanation = 'Skids commonly occur when drivers travel too fast for slippery, wet or otherwise poor road conditions.',
  category = 'Skid Prevention'
where id = 208;

update public.rules_questions set
  question_text = 'How should you recover if your vehicle starts to skid?',
  option_a = 'Apply the parking brake',
  option_b = 'Brake hard and hold the wheel straight',
  option_c = 'Ease off the accelerator and steer smoothly where you want to go',
  option_d = 'Accelerate until the tires regain grip',
  correct_option = 'C',
  explanation = 'Ease off the accelerator, avoid hard braking, and steer smoothly in the direction you want the vehicle to go.',
  category = 'Skid Recovery'
where id = 209;

update public.rules_questions set
  question_text = 'What does a broken white line normally separate?',
  option_a = 'Traffic lanes moving in the same direction',
  option_b = 'Opposing traffic on a two-way road',
  option_c = 'The roadway from the shoulder',
  option_d = 'A no-passing zone',
  correct_option = 'A',
  explanation = 'White lines separate lanes of traffic moving in the same direction. Yellow lines separate traffic moving in opposite directions.',
  category = 'Lane Markings'
where id = 213;

update public.rules_questions set
  question_text = 'What should you do when approaching a construction zone?',
  option_a = 'Maintain speed so traffic does not slow',
  option_b = 'Follow directions from traffic-control workers and signs, reduce speed, and be ready to stop',
  option_c = 'Change lanes repeatedly to get through faster',
  option_d = 'Use the shoulder to pass queued traffic',
  correct_option = 'B',
  explanation = 'Slow down, leave extra space, obey signs and traffic-control workers, and be prepared for workers, equipment or sudden lane changes.',
  category = 'Construction Zones'
where id = 214;

-- Correct visual questions whose text, answer or explanation did not match
-- the image presented to learners.
update public.signs_questions set
  option_c = 'Yield sign ahead',
  explanation = 'This warning sign indicates a stop sign ahead. Slow down and be prepared to stop.',
  image_description = 'Yellow diamond warning sign showing a stop-sign symbol ahead'
where id = 1;

update public.signs_questions set
  option_b = 'Traffic signals ahead',
  explanation = 'This warning sign shows traffic signals ahead. Be prepared to slow down or stop.',
  image_description = 'Yellow diamond warning sign with a traffic-signal symbol'
where id = 10;

update public.signs_questions set
  option_b = 'Truck entrance from the right',
  explanation = 'This warning sign indicates that trucks may enter the road from the right. Reduce speed and watch for large vehicles.',
  image_description = 'Yellow diamond warning sign showing a truck entering from the right'
where id = 18;

update public.signs_questions set
  correct_option = 'B',
  explanation = 'The orange triangle identifies a slow-moving vehicle, which normally travels at 40 km/h or less.',
  image_description = 'Orange slow-moving-vehicle triangle mounted on the rear of a tractor'
where id = 24;

update public.signs_questions set
  option_b = 'Passing or climbing lane ahead; keep right unless passing',
  explanation = 'This sign shows that an additional passing or climbing lane begins ahead. Slower traffic should keep right.',
  image_description = 'Black-and-white regulatory sign showing an additional lane beginning on the right'
where id = 39;

update public.signs_questions set
  image_description = 'Cyclist extending the left arm downward to signal slowing or stopping',
  explanation = 'A cyclist extending the left arm downward is signalling that they are slowing or stopping.'
where id = 49;

update public.signs_questions set
  image_description = 'Cyclist extending the left arm straight out to signal a left turn',
  explanation = 'A cyclist extending the left arm straight out is signalling a left turn.'
where id = 50;

update public.signs_questions set
  option_a = 'Going straight and turning right are prohibited',
  option_b = 'Left turn only',
  option_c = 'Both A and B',
  option_d = 'Right turn only',
  correct_option = 'C',
  explanation = 'The sign prohibits going straight and turning right, so traffic may turn left only.',
  image_description = 'Regulatory sign prohibiting straight-through and right-turn movements'
where id = 82;

update public.signs_questions set
  option_a = 'Going straight and turning left are prohibited',
  option_b = 'Right turn only',
  option_c = 'Both A and B',
  option_d = 'Left turn only',
  correct_option = 'C',
  explanation = 'The sign prohibits going straight and turning left, so traffic may turn right only.',
  image_description = 'Regulatory sign prohibiting straight-through and left-turn movements'
where id = 83;

update public.signs_questions set
  option_a = 'Turning vehicles must yield to cyclists and pedestrians',
  correct_option = 'A',
  explanation = 'Turning drivers must yield to both cyclists and pedestrians before crossing their path.',
  image_description = 'Regulatory sign requiring turning vehicles to yield to bicycles and pedestrians'
where id = 90;

update public.signs_questions set
  option_a = 'Pedestrian crossover ahead',
  option_b = 'School zone ahead',
  option_c = 'Pedestrians prohibited',
  option_d = 'Playground area',
  correct_option = 'A',
  explanation = 'This warning sign indicates a pedestrian crossover ahead. Slow down and be ready to yield or stop.',
  image_description = 'Yellow diamond warning sign indicating a pedestrian crossover ahead'
where id = 100;

-- Make every answer independent of its stored letter. The imported bank used
-- choices such as "Both A and B"; those become invalid when options move.
update public.signs_questions set
  option_a = 'Stop sign ahead',
  option_b = 'Stop if the road is crowded',
  option_c = 'Yield sign ahead',
  option_d = 'Railway crossing ahead',
  correct_option = 'A'
where id = 1;

update public.signs_questions set
  option_a = 'Traffic sign ahead',
  option_b = 'Traffic signals ahead',
  option_c = 'Stop at every intersection ahead',
  option_d = 'Intersections ahead have no controls',
  correct_option = 'B'
where id = 10;

update public.signs_questions set
  option_a = 'Truck entrance from the left',
  option_b = 'Truck entrance from the right',
  option_c = 'Fire station ahead',
  option_d = 'Bus stop ahead',
  correct_option = 'B'
where id = 18;

update public.signs_questions set
  option_a = 'Road work ahead',
  option_b = 'Yield sign ahead',
  option_c = 'Vehicles travelling over 40 km/h must display this sign',
  option_d = 'Slow-moving vehicle',
  correct_option = 'D'
where id = 24;

update public.signs_questions set
  option_a = 'Road divides ahead',
  option_b = 'Freeway exit ahead',
  option_c = 'Passing or climbing lane ahead; keep right unless passing',
  option_d = 'Two-way road ends ahead',
  correct_option = 'C'
where id = 39;

update public.signs_questions set
  question_text = 'What does this sign require?',
  option_a = 'Come to a complete stop in every situation',
  option_b = 'Yield the right-of-way',
  option_c = 'Speed up before entering',
  option_d = 'Travel in one direction only',
  correct_option = 'B',
  explanation = 'This is a yield sign. Slow down or stop if necessary and give the right-of-way before proceeding.'
where id = 14;

update public.signs_questions set
  option_a = 'Farm machinery entrance ahead',
  option_b = 'Zoo entrance ahead',
  option_c = 'Deer crossing area',
  option_d = 'Livestock prohibited',
  correct_option = 'C'
where id = 19;

update public.signs_questions set
  option_a = 'Only vehicles with two occupants may use this lane',
  option_b = 'Only buses may use this lane',
  option_c = 'The lane is closed to passenger vehicles',
  option_d = 'Vehicles with at least the posted number of occupants may use this lane',
  correct_option = 'D'
where id = 60;

update public.signs_questions set
  option_a = 'Playground parking area',
  option_b = 'Children are prohibited',
  option_c = 'Pedestrian tunnel ahead',
  option_d = 'School crossing ahead; slow down and obey the crossing guard',
  correct_option = 'D'
where id = 64;

update public.signs_questions set
  question_text = 'Which movement does this sign permit?',
  option_a = 'Going straight only',
  option_b = 'Turning left only',
  option_c = 'Turning right only',
  option_d = 'Making a U-turn only',
  correct_option = 'B',
  explanation = 'The sign prohibits going straight and turning right, so traffic may turn left only.'
where id = 82;

update public.signs_questions set
  question_text = 'Which movement does this sign permit?',
  option_a = 'Going straight only',
  option_b = 'Turning left only',
  option_c = 'Turning right only',
  option_d = 'Making a U-turn only',
  correct_option = 'C',
  explanation = 'The sign prohibits going straight and turning left, so traffic may turn right only.'
where id = 83;

update public.signs_questions set
  option_a = 'Cyclists must always stop for turning vehicles',
  option_b = 'Turning vehicles must yield to cyclists and pedestrians',
  option_c = 'All vehicles must share the bicycle lane',
  option_d = 'Drivers must stop whenever a cyclist is visible',
  correct_option = 'B'
where id = 90;

update public.rules_questions set
  option_a = 'Only when changing lanes',
  option_b = 'Only when entering a parking space',
  option_c = 'Only when reversing',
  option_d = 'Before changing lanes, merging, or turning where another road user may be in your blind spot',
  correct_option = 'D',
  explanation = 'Check over the appropriate shoulder whenever a cyclist, pedestrian or vehicle could be hidden in your blind spot before you move sideways or turn.'
where id = 56;

update public.rules_questions set
  option_a = 'Accelerate to clear the intersection',
  option_b = 'Stop if you can do so safely; otherwise proceed cautiously',
  option_c = 'Reverse away from the intersection',
  option_d = 'Stop in the intersection',
  correct_option = 'B',
  explanation = 'A yellow light warns that red is about to appear. Stop if you can do so safely; if you cannot, proceed through the intersection cautiously.'
where id = 146;

update public.rules_questions set
  option_a = 'Drive only to work',
  option_b = 'Drive only during daylight hours',
  option_c = 'Do not drive under any circumstances while suspended',
  option_d = 'Drive only with a fully licensed passenger',
  correct_option = 'C',
  explanation = 'A suspended licence is not valid. You must not drive until the suspension has ended and your licence has been reinstated.'
where id = 147;

update public.rules_questions set
  option_a = 'Only while driving on a freeway',
  option_b = 'Only after full darkness',
  option_c = 'Only when another driver flashes their lights',
  option_d = 'From 30 minutes before sunset to 30 minutes after sunrise, and whenever visibility is poor',
  correct_option = 'D',
  explanation = 'Ontario requires the full lighting system from 30 minutes before sunset until 30 minutes after sunrise and whenever poor light or weather prevents a clear view of people or vehicles 150 metres away.'
where id = 148;

update public.rules_questions set
  option_a = 'Only left turns are permitted',
  option_b = 'Only right turns are permitted',
  option_c = 'You may turn left, go straight, or turn right while opposing traffic is stopped',
  option_d = 'The signal is only for pedestrians',
  correct_option = 'C',
  explanation = 'A flashing green light is an advanced green. You may turn left, go straight, or turn right while opposing traffic faces red, but must still yield to pedestrians.'
where id = 163;

update public.rules_questions set
  option_a = 'Brake hard immediately',
  option_b = 'Ease off the accelerator, hold the steering wheel firmly, and slow down gradually',
  option_c = 'Accelerate to stabilize the tire',
  option_d = 'Turn sharply onto the shoulder',
  correct_option = 'B',
  explanation = 'If a tire blows out, keep a firm grip, ease off the accelerator, avoid hard braking, and bring the vehicle to a controlled stop.'
where id = 170;

update public.rules_questions set
  option_a = 'Stop in the travel lane before the exit',
  option_b = 'Reverse if you pass the exit',
  option_c = 'Signal, enter the exit lane safely, and reduce speed according to the ramp signs',
  option_d = 'Cross the gore area if the exit lane is full',
  correct_option = 'C',
  explanation = 'Plan ahead, signal, move into the correct exit lane, maintain control, and follow the posted ramp speed. Never reverse or cross the gore area.'
where id = 175;

update public.rules_questions set
  option_a = 'Move the injured person immediately in every case',
  option_b = 'Call for help, provide assistance within your training, and avoid moving the person unless necessary for safety',
  option_c = 'Leave the scene to find a tow truck',
  option_d = 'Discuss fault before calling emergency services',
  correct_option = 'B',
  explanation = 'Call emergency services, give reasonable assistance, and do not move an injured person unless there is immediate danger or trained responders direct you.'
where id = 186;

update public.rules_questions set
  option_a = 'Increase speed through standing water',
  option_b = 'Use worn tires to improve water displacement',
  option_c = 'Brake sharply whenever the road is wet',
  option_d = 'Reduce speed in rain and keep tires properly inflated with adequate tread',
  correct_option = 'D',
  explanation = 'Reduce speed on wet roads and maintain correct tire pressure and tread depth to reduce the risk of hydroplaning.'
where id = 216;

update public.signs_questions
set
  option_a = case when option_a ~* '(both|all|none|either).*(above|these|[A-D] (and|or) [A-D])' then 'The sign may be ignored' else option_a end,
  option_b = case when option_b ~* '(both|all|none|either).*(above|these|[A-D] (and|or) [A-D])' then 'The sign applies only at night' else option_b end,
  option_c = case when option_c ~* '(both|all|none|either).*(above|these|[A-D] (and|or) [A-D])' then 'The sign is optional on public roads' else option_c end,
  option_d = case when option_d ~* '(both|all|none|either).*(above|these|[A-D] (and|or) [A-D])' then 'The sign has no legal meaning' else option_d end;

update public.rules_questions
set
  option_a = case when option_a ~* '(both|all|none|either).*(above|these|[A-D] (and|or) [A-D])' then 'No special action is required' else option_a end,
  option_b = case when option_b ~* '(both|all|none|either).*(above|these|[A-D] (and|or) [A-D])' then 'Ignore the situation and continue without changing your driving' else option_b end,
  option_c = case when option_c ~* '(both|all|none|either).*(above|these|[A-D] (and|or) [A-D])' then 'The rule applies only to commercial vehicles' else option_c end,
  option_d = case when option_d ~* '(both|all|none|either).*(above|these|[A-D] (and|or) [A-D])' then 'The rule is optional' else option_d end;

-- Re-run rule taxonomy for rewritten categories.
update public.rules_questions
set
  subcategory = category,
  difficulty_level = case
    when category ~* '(suspension|impair|alcohol|collision|G1|G2|distance|headlight|streetcar|seatbelt)' then 'hard'
    when category ~* '(defensive|weather|vehicle safety|mirrors)' then 'easy'
    else 'medium'
  end,
  is_frequently_tested = category ~* '(seatbelt|traffic light|sign|emergency|headlight|speed|freeway|streetcar|school bus|suspension|demerit|passing|collision|sharing|pedestrian|cyclist|right of way|intersection|G1|G2)';

-- Balance answer positions without changing the answer text. This removes the
-- strong B-position bias in the imported bank and prevents pattern guessing.
with ranked as (
  select
    id,
    correct_option as old_correct,
    (array['A', 'B', 'C', 'D'])[
      (((row_number() over (order by id) - 1) % 4) + 1)::integer
    ] as target_correct
  from public.signs_questions
  where is_active is true
), answers as (
  select
    ranked.*,
    case ranked.old_correct
      when 'A' then question.option_a
      when 'B' then question.option_b
      when 'C' then question.option_c
      when 'D' then question.option_d
    end as correct_answer,
    case ranked.target_correct
      when 'A' then question.option_a
      when 'B' then question.option_b
      when 'C' then question.option_c
      when 'D' then question.option_d
    end as target_answer
  from ranked
  join public.signs_questions as question using (id)
)
update public.signs_questions as question
set
  option_a = case when answers.target_correct = 'A' then answers.correct_answer when answers.old_correct = 'A' then answers.target_answer else question.option_a end,
  option_b = case when answers.target_correct = 'B' then answers.correct_answer when answers.old_correct = 'B' then answers.target_answer else question.option_b end,
  option_c = case when answers.target_correct = 'C' then answers.correct_answer when answers.old_correct = 'C' then answers.target_answer else question.option_c end,
  option_d = case when answers.target_correct = 'D' then answers.correct_answer when answers.old_correct = 'D' then answers.target_answer else question.option_d end,
  correct_option = answers.target_correct
from answers
where question.id = answers.id;

with ranked as (
  select
    id,
    correct_option as old_correct,
    (array['A', 'B', 'C', 'D'])[
      (((row_number() over (order by id) - 1) % 4) + 1)::integer
    ] as target_correct
  from public.rules_questions
  where is_active is true
), answers as (
  select
    ranked.*,
    case ranked.old_correct
      when 'A' then question.option_a
      when 'B' then question.option_b
      when 'C' then question.option_c
      when 'D' then question.option_d
    end as correct_answer,
    case ranked.target_correct
      when 'A' then question.option_a
      when 'B' then question.option_b
      when 'C' then question.option_c
      when 'D' then question.option_d
    end as target_answer
  from ranked
  join public.rules_questions as question using (id)
)
update public.rules_questions as question
set
  option_a = case when answers.target_correct = 'A' then answers.correct_answer when answers.old_correct = 'A' then answers.target_answer else question.option_a end,
  option_b = case when answers.target_correct = 'B' then answers.correct_answer when answers.old_correct = 'B' then answers.target_answer else question.option_b end,
  option_c = case when answers.target_correct = 'C' then answers.correct_answer when answers.old_correct = 'C' then answers.target_answer else question.option_c end,
  option_d = case when answers.target_correct = 'D' then answers.correct_answer when answers.old_correct = 'D' then answers.target_answer else question.option_d end,
  correct_option = answers.target_correct
from answers
where question.id = answers.id;

-- Abort instead of leaving a partly repaired bank if required content is
-- missing or the expected 300 active questions are not present.
do $$
declare
  signs_count integer;
  rules_count integer;
begin
  select count(*) into signs_count
  from public.signs_questions
  where is_active is true;

  select count(*) into rules_count
  from public.rules_questions
  where is_active is true;

  if signs_count <> 100 or rules_count <> 200 then
    raise exception 'Expected 100 active sign and 200 active rule questions; found % and %', signs_count, rules_count;
  end if;

  if exists (
    select 1
    from public.signs_questions
    where is_active is true
      and (
        nullif(trim(question_text), '') is null
        or nullif(trim(option_a), '') is null
        or nullif(trim(option_b), '') is null
        or nullif(trim(option_c), '') is null
        or nullif(trim(option_d), '') is null
        or correct_option not in ('A', 'B', 'C', 'D')
        or nullif(trim(explanation), '') is null
        or nullif(trim(category), '') is null
        or nullif(trim(subcategory), '') is null
        or difficulty_level not in ('easy', 'medium', 'hard')
        or nullif(trim(image_url), '') is null
        or nullif(trim(image_description), '') is null
        or nullif(trim(learning_topic), '') is null
        or nullif(trim(handbook_section), '') is null
        or nullif(trim(handbook_url), '') is null
      )
  ) then
    raise exception 'Active sign questions failed required-field validation';
  end if;

  if exists (
    select 1
    from public.rules_questions
    where is_active is true
      and (
        nullif(trim(question_text), '') is null
        or nullif(trim(option_a), '') is null
        or nullif(trim(option_b), '') is null
        or nullif(trim(option_c), '') is null
        or nullif(trim(option_d), '') is null
        or correct_option not in ('A', 'B', 'C', 'D')
        or nullif(trim(explanation), '') is null
        or nullif(trim(category), '') is null
        or nullif(trim(subcategory), '') is null
        or difficulty_level not in ('easy', 'medium', 'hard')
        or nullif(trim(learning_topic), '') is null
        or nullif(trim(handbook_section), '') is null
        or nullif(trim(handbook_url), '') is null
      )
  ) then
    raise exception 'Active rule questions failed required-field validation';
  end if;
end
$$;

commit;
