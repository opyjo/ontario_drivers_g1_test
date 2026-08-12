begin;

create temporary table new_rules_question_batch (
  authoring_id integer primary key,
  question_text text not null,
  category text not null,
  option_a text not null,
  option_b text not null,
  option_c text not null,
  option_d text not null,
  correct_option text not null,
  explanation text not null,
  difficulty_level text not null,
  is_frequently_tested boolean not null,
  subcategory text not null,
  learning_topic text not null,
  handbook_section text not null,
  handbook_url text not null
) on commit drop;

insert into new_rules_question_batch
select
  (item->>0)::integer,
  item->>1,
  item->>2,
  item->>3,
  item->>4,
  item->>5,
  item->>6,
  item->>7,
  item->>8,
  item->>9,
  (item->>10)::boolean,
  item->>11,
  case item->>12
    when 'parking' then 'Road position and manoeuvres'
    when 'freeway' then 'Road position and manoeuvres'
    when 'licence' then 'Licensing and responsibilities'
    when 'maintenance' then 'Safe and responsible driving'
    when 'towing' then 'Safe and responsible driving'
    when 'efficiency' then 'Safe and responsible driving'
    when 'situations' then 'Safe and responsible driving'
  end,
  case item->>12
    when 'parking' then 'Parking along roadways'
    when 'freeway' then 'Freeway driving'
    when 'licence' then 'Keeping your driver''s licence'
    when 'maintenance' then 'Maintaining your vehicle'
    when 'towing' then 'Towing'
    when 'efficiency' then 'Driving efficiently'
    when 'situations' then 'Dealing with particular situations'
  end,
  case item->>12
    when 'parking' then 'https://www.ontario.ca/document/official-mto-drivers-handbook/parking-along-roadways'
    when 'freeway' then 'https://www.ontario.ca/document/official-mto-drivers-handbook/freeway-driving'
    when 'licence' then 'https://www.ontario.ca/document/official-mto-drivers-handbook/keeping-your-drivers-licence'
    when 'maintenance' then 'https://www.ontario.ca/document/official-mto-drivers-handbook/maintaining-your-vehicle'
    when 'towing' then 'https://www.ontario.ca/document/official-mto-drivers-handbook/towing'
    when 'efficiency' then 'https://www.ontario.ca/document/official-mto-drivers-handbook/driving-efficiently'
    when 'situations' then 'https://www.ontario.ca/document/official-mto-drivers-handbook/dealing-particular-situations'
  end
from jsonb_array_elements($question_bank$
[
  [1,"Where should you park if you must stop because of a problem on a road?","Parking Rules","Completely off the travelled part of the road, on the shoulder when available","In the nearest traffic lane","Across a sidewalk","Beside the centre line","A","Never park on the travelled part of a road. Move fully off the roadway onto the shoulder when an unavoidable stop is necessary.","easy",true,"Travelled roadway","parking"],
  [2,"How much clear view should you have in both directions before parking near a curve or hill?","Parking Rules","At least 50 metres","At least 125 metres","At least 75 metres","At least 200 metres","B","Do not park on a curve, hill or other location unless there is a clear view for at least 125 metres in both directions.","hard",true,"Sight distance","parking"],
  [3,"Which area must remain unobstructed when you park?","Parking Rules","Only marked bicycle lanes","Only private driveways","Sidewalks, crosswalks, pedestrian crossings and road entrances","Only areas directly beside a parking meter","C","A parked vehicle must not block sidewalks, crosswalks, pedestrian crossings, road entrances or another parked vehicle.","easy",true,"Keeping access clear","parking"],
  [4,"How close may you park to an intersection controlled by traffic lights?","Parking Distances","No closer than three metres","No closer than six metres","No closer than nine metres","No closer than 15 metres","D","Do not park within 15 metres of an intersection controlled by traffic lights.","hard",true,"Signalized intersections","parking"],
  [5,"A parking space begins seven metres from an intersection with no traffic lights. May you park there?","Parking Distances","No; parking must be at least nine metres from that intersection","Yes, because the space is more than six metres away","Yes, if hazard lights are used","No; every intersection requires 15 metres","A","At an intersection without traffic lights, parking is prohibited within nine metres, so a space only seven metres away is too close.","hard",true,"Unsignalized intersections","parking"],
  [6,"How close may you park to the nearest rail of a level railway crossing?","Parking Distances","No closer than five metres","No closer than 15 metres","No closer than 30 metres","No closer than 100 metres","B","Parking is prohibited within 15 metres of the nearest rail at a level railway crossing.","hard",true,"Railway crossings","parking"],
  [7,"How close may you park to a bridge?","Parking Distances","No closer than 15 metres","No closer than 30 metres","No closer than 100 metres","No closer than 125 metres","C","Do not park on a bridge or within 100 metres of one.","hard",false,"Bridges","parking"],
  [8,"How close may you park to the public entrance of an open hotel, theatre or public hall?","Parking Distances","No closer than two metres","No closer than three metres","No closer than five metres","No closer than six metres","D","Do not park within six metres of the public entrance to an open hotel, theatre or public hall.","hard",false,"Public entrances","parking"],
  [9,"Who is an Accessible Parking Permit issued to?","Accessible Parking","The eligible permit holder, not a specific vehicle","The vehicle's registered owner only","A particular licence plate","The parking facility","A","The permit belongs to the qualified person and may be displayed in a vehicle in which that person is travelling.","medium",true,"Permit holder","parking"],
  [10,"When may a vehicle use a designated accessible parking space?","Accessible Parking","Whenever the driver is making a short stop","When a valid permit for the driver or a passenger is properly displayed","Whenever the vehicle has hazard lights on","Only when the vehicle is specially modified","B","A valid Accessible Parking Permit belonging to the driver or a passenger must be displayed when using a designated accessible space.","medium",true,"Permit display","parking"],
  [11,"About how long should a suitable parallel-parking space be?","Parallel Parking","The exact length of your vehicle","Twice the length of your vehicle","About one and one-half times the length of your vehicle","Three times the length of your vehicle","C","For right-side parallel parking, look for a space about one and one-half times longer than your vehicle.","medium",true,"Selecting a space","parking"],
  [12,"When lining up to begin a right-side parallel park, about how much space should you leave beside the parked vehicle?","Parallel Parking","About 20 centimetres","About 50 centimetres","About two metres","About one metre","D","Pull alongside the vehicle ahead of the space and leave about one metre between the vehicles.","hard",false,"Initial position","parking"],
  [13,"After completing a parallel park, what should you do before leaving the vehicle?","Parallel Parking","Set the parking brake, select park or an appropriate gear, turn off the engine and check traffic before opening the door","Leave the transmission in neutral and the engine running","Turn the wheels toward the road in every situation","Leave the key in the ignition","A","Secure the parked vehicle, remove the key, check traffic before opening the door and lock the vehicle.","medium",true,"Securing the vehicle","parking"],
  [14,"During a roadside stop, how far should the vehicle normally be from the curb or road edge?","Roadside Stops","No more than one metre","No more than about 30 centimetres","Exactly two metres","Any distance if hazard lights are on","B","Stop parallel to the curb or road edge and no more than about 30 centimetres away.","hard",true,"Stopping position","parking"],
  [15,"What should you do with your signals after stopping at the roadside?","Roadside Stops","Leave the turn signal on","Turn off every exterior light","Cancel the turn signal and turn on the hazard lights","Use high beams instead","C","After completing the roadside stop, cancel the turn signal and activate the hazard lights.","easy",true,"Warning lights","parking"],
  [16,"Just before pulling away from a roadside stop, what final check is required?","Roadside Stops","Check only the speedometer","Sound the horn","Look only through the windshield","Check mirrors and the blind spot for vehicles and cyclists","D","Before moving out, check mirrors and the blind spot to ensure the path is clear of vehicles and cyclists.","medium",true,"Re-entering traffic","parking"],

  [17,"What are the two usual parts of a freeway entrance?","Freeway Driving","An entrance ramp and an acceleration lane","A deceleration lane and a shoulder","A toll lane and a passing lane","A median and a service road","A","A freeway entrance normally consists of an entrance ramp followed by an acceleration lane.","easy",true,"Entrance design","freeway"],
  [18,"What is the purpose of a freeway acceleration lane?","Freeway Driving","To stop before joining traffic","To increase speed to match freeway traffic before merging","To allow parking beside the freeway","To make a U-turn","B","Use the acceleration lane to bring your vehicle close to the speed of freeway traffic and merge smoothly.","easy",true,"Acceleration lanes","freeway"],
  [19,"Who is responsible for finding a safe gap when entering a freeway?","Freeway Merging","The driver already in the left lane","The vehicle behind the merging vehicle","The driver entering the freeway","The nearest truck driver","C","The entering driver must assess traffic, choose a safe gap and adjust speed to merge without disrupting freeway traffic.","medium",true,"Merging responsibility","freeway"],
  [20,"What is special about an entrance ramp that joins a freeway from the left?","Freeway Merging","It has no acceleration lane","Traffic must stop at its end","It enters the slowest lane first","It enters the fastest lane first, so speed may need to be matched more quickly","D","A left-side entrance joins the fastest lane, requiring careful observation and prompt speed matching.","hard",false,"Left-side entrances","freeway"],
  [21,"At freeway speeds, how far ahead should you generally scan?","Freeway Observation","About 15 to 20 seconds ahead, or as far as you can see","Only to the rear bumper ahead","About two seconds ahead","Only to the next lane marking","A","At higher speeds, look toward where you will be in the next 15 to 20 seconds while continuing to scan mirrors and surroundings.","hard",true,"Visual lead time","freeway"],
  [22,"How should the far-left lane of a multi-lane freeway normally be used?","Freeway Lane Use","For continuous cruising at any speed","For passing, returning right when practical","For trucks towing trailers only","For stopping during congestion","B","Use the far-left lane to pass slower traffic, but do not remain there unnecessarily; keep right when possible.","easy",true,"Passing lane","freeway"],
  [23,"Why should you leave extra space around large vehicles on a freeway?","Freeway Spacing","They always travel below the speed limit","They are required to change lanes suddenly","They block more of your view, so space improves visibility and reaction time","Their drivers cannot use mirrors","C","Large vehicles obstruct sight lines. Space around your vehicle helps you see hazards and gives you time to respond.","medium",true,"Space management","freeway"],
  [24,"What are the three usual parts of a freeway exit?","Freeway Exits","A passing lane, shoulder and median","An acceleration lane, tunnel and intersection","A ramp, bridge and toll booth","A deceleration lane, an exit ramp and an intersection or control at the end","D","A typical exit has a deceleration lane, an exit ramp and then an intersection controlled by a sign or signal.","medium",false,"Exit design","freeway"],
  [25,"When should you begin reducing speed to leave a freeway?","Freeway Exits","After entering the deceleration lane","While still in the main freeway lane","Before signalling","Only at the intersection beyond the ramp","A","Signal and enter the deceleration lane at freeway speed, then reduce speed gradually in that lane.","medium",true,"Deceleration lanes","freeway"],
  [26,"What is speed adaptation, sometimes called velocitization?","Freeway Exits","The ability to match traffic instantly","Difficulty judging your true speed after travelling at freeway speed","Automatic braking on an exit ramp","Changing speed because of wind","B","After sustained high-speed driving, a lower speed can feel slower than it really is. Check the speedometer on exit ramps.","hard",true,"Velocitization","freeway"],
  [27,"What should you do if you miss a freeway exit?","Freeway Exits","Stop on the shoulder and reverse","Make a U-turn through the median","Continue to the next exit","Back up in the deceleration lane","C","Never stop or reverse on a freeway to recover a missed exit. Continue and use the next exit.","easy",true,"Missed exits","freeway"],
  [28,"Why can freeway driving be safer for an experienced driver despite its higher speeds?","Freeway Driving","Every vehicle travels at exactly the same speed","Emergency vehicles are prohibited","Lane changes are unnecessary","Freeways have separated directions and no intersections, bicycles or pedestrians","D","Controlled access and separation remove several conflict points, though higher speeds still require skill and attention.","medium",false,"Controlled access","freeway"],
  [29,"What determines whether a vehicle may use an HOV lane?","HOV Lanes","The posted vehicle-occupancy and eligibility rules","The colour of the vehicle","Whether the driver is passing","The vehicle's age","A","HOV lanes are reserved for vehicles meeting the minimum occupancy or other eligibility shown on signs.","medium",true,"Lane eligibility","freeway"],
  [30,"What should a freeway driver do when a vehicle is entering and there is room to help?","Freeway Merging","Stop in the travel lane","Move over if it is safe, leaving space for the entering vehicle","Speed up to close the gap","Drive onto the shoulder","B","Although the entering driver must merge safely, freeway drivers should move over when safe to create room.","medium",false,"Cooperative merging","freeway"],

  [31,"When must you carry your Ontario driver's licence?","Licence Requirements","Only on trips outside your city","Only during a road test","Whenever you drive","Only when driving at night","C","Drivers must carry their valid licence whenever they drive and produce it when requested by police.","easy",true,"Carrying a licence","licence"],
  [32,"How long after expiry can a car or motorcycle licence generally be renewed without taking tests?","Licence Renewal","Three months","Six months","Two years","Within one year","D","An expired car or motorcycle licence can generally be renewed within one year without tests.","hard",false,"Expired licences","licence"],
  [33,"How often must an Ontario driver aged 80 or older renew a driver's licence?","Senior Drivers","Every two years","Every year","Every three years","Every five years","A","Drivers aged 80 and older must renew every two years and complete the senior renewal process.","medium",true,"Renewal interval","licence"],
  [34,"Which requirement is part of the renewal process for drivers aged 80 or older?","Senior Drivers","A motorcycle skills test","A vision test, driving-record review, group education session and in-class screening","A commercial medical exam in every case","A new knowledge test every year","B","The senior renewal process includes a record review, vision test, group education and in-class screening; further testing may sometimes be required.","hard",false,"Renewal screening","licence"],
  [35,"What may be required if a licence has been expired for more than three years?","Licence Renewal","Payment of a late fee only","A vision test only","Reapplication under graduated licensing with all required tests","A letter from an insurer only","C","After more than three years, the applicant must reapply and meet graduated-licensing requirements, including required tests.","hard",true,"Long-expired licences","licence"],
  [36,"How long do most novice drivers have to complete graduated licensing?","Graduated Licensing","Two years","Three years","Ten years","Five years, except for Class M1","D","Except for Class M1, novice drivers generally have five years to finish the graduated-licensing process.","hard",false,"Completion period","licence"],
  [37,"What is graduated-licensing requalification?","Graduated Licensing","Retaining or regaining the same novice class by passing the required test and paying the five-year fee before expiry","Automatically receiving a full licence","Converting a G1 directly to a commercial licence","Renewing without any test after expiry","A","Eligible G1, G2 and M2 drivers nearing expiry can requalify for the same class by testing and paying the licensing fee.","hard",false,"Requalification","licence"],
  [38,"How soon must you notify the Ministry of Transportation after changing your name or address?","Licence Information","Within 24 hours","Within six days","Within 30 days","At the next renewal","B","Ontario drivers must report a name or address change to the ministry within six days.","medium",true,"Name and address changes","licence"],
  [39,"Which action involving a driver's licence is legal?","Licence Laws","Lending it to a relative","Keeping two Ontario licences","None of these actions; lending, altering or using another person's licence is illegal","Using an imitation licence for identification","C","It is illegal to lend a licence, let another person use it, alter it, possess more than one Ontario licence or use a fictitious licence.","medium",true,"Licence misuse","licence"],
  [40,"From what date do demerit points normally remain on a driver's record for two years?","Demerit Points","The conviction payment date","The licence renewal date","The date a warning letter is mailed","The date of the offence","D","Demerit points remain on the record for two years from the date of the offence.","hard",true,"Point duration","licence"],
  [41,"What happens when a novice driver accumulates two or more demerit points?","Novice Demerit Points","The driver receives a warning letter","The licence is immediately cancelled","The driver must repeat the road test","The vehicle is impounded","A","At two or more points, a Level One or Level Two driver receives a warning letter.","medium",true,"First warning","licence"],
  [42,"What happens when a novice driver reaches six demerit points?","Novice Demerit Points","The licence is suspended for six months","A second warning letter is issued","All points are erased","A full G licence is granted","B","At six points, a novice driver receives a second warning letter encouraging improved driving behaviour.","medium",true,"Second warning","licence"],
  [43,"How are demerit points treated when a novice driver receives an escalating sanction for violating a novice condition?","Novice Driver Sanctions","They are doubled","They are transferred to the vehicle owner","The sanction applies, but the points for that occurrence are recorded as zero for accumulated-point purposes","They are held until the driver obtains a full licence","C","A novice-condition violation can trigger an escalating suspension while its demerit points are recorded as zero and not counted toward the accumulated-point system.","hard",true,"Points and escalating sanctions","licence"],
  [44,"How many demerit points are assigned for failing to stop for a school bus?","Demerit Point Values","Two","Three","Four","Six","D","Failing to stop for a school bus is a six-demerit-point offence.","medium",true,"School-bus offence","licence"],
  [45,"How many demerit points are assigned for failing to stop at a pedestrian crossover?","Demerit Point Values","Four","Two","Three","Six","A","Failing to stop at a pedestrian crossover is assigned four demerit points.","medium",true,"Pedestrian crossover offence","licence"],
  [46,"Which event can trigger a novice-driver escalating sanction?","Novice Driver Sanctions","A parking ticket without demerit points","A repeat novice-condition violation, a four-or-more-point HTA conviction, or a court-ordered suspension","Renewing a licence early","Taking an approved driver-education course","B","Escalating sanctions apply to repeat novice-condition violations, qualifying four-or-more-point convictions and court-ordered suspensions within the applicable period.","hard",true,"Escalating-sanction triggers","licence"],
  [47,"How many demerit points are assigned for careless driving?","Demerit Point Values","Two","Four","Six","Seven","C","Careless driving is assigned six demerit points.","hard",true,"Careless driving","licence"],
  [48,"How many demerit points are assigned for failing to remain at a collision scene?","Demerit Point Values","Two","Four","Six","Seven","D","Failing to remain at a collision scene is assigned seven demerit points.","hard",true,"Collision scene","licence"],
  [49,"How many demerit points are assigned for following another vehicle too closely?","Demerit Point Values","Four","Two","Three","Six","A","Following too closely is a four-demerit-point offence.","hard",true,"Following too closely","licence"],
  [50,"How many demerit points are assigned for failing to lower high beams when required?","Demerit Point Values","Three","Two","Four","Six","B","Failing to lower the headlight beam is a two-demerit-point offence.","hard",false,"Headlight beams","licence"],

  [51,"What can happen if an officer or inspector finds a vehicle unsafe?","Vehicle Maintenance","Only a written suggestion is issued","The driver must sell the vehicle","The vehicle may be taken off the road until repaired","The licence plate changes automatically","C","An unsafe vehicle or trailer may be removed from service until the safety problem is corrected.","medium",true,"Unsafe vehicles","maintenance"],
  [52,"What should you look for while approaching your vehicle before a trip?","Pre-Drive Inspection","Only whether the doors are locked","Only the fuel level","Only the licence plate","Fresh damage, fluid leaks, tire problems, open panels and unsecured loads","D","A walk-around should identify visible damage, leaks, under-inflated tires, open doors or panels and unsecured loads.","easy",true,"Exterior walk-around","maintenance"],
  [53,"What should normally happen to dashboard warning lights after the engine starts?","Pre-Drive Inspection","They should illuminate during the check and then go out if systems are normal","They should all remain on","They should flash continuously","They should be covered from view","A","Warning lights commonly illuminate during startup as a system check and should then go out unless a problem exists.","medium",true,"Dashboard warnings","maintenance"],
  [54,"Which checks deserve extra attention before an extended trip?","Pre-Trip Inspection","The radio presets and interior colour","Wipers and washer fluid, tire condition and pressure, lights, oil, coolant, belts, hoses and leaks","Only the horn","Only the rear licence plate","B","Long-trip preparation should include visibility equipment, tires, lights and under-hood fluid and component checks with the engine cold.","medium",true,"Extended trips","maintenance"],
  [55,"How do manufacturers commonly schedule regular vehicle maintenance?","Vehicle Maintenance","By the driver's age only","Only when a warning light appears","By accumulated distance or time, whichever comes first","Every five years regardless of use","C","Maintenance intervals are commonly based on mileage or elapsed time, whichever occurs first.","medium",false,"Service intervals","maintenance"],
  [56,"Why should a noisy or rattling exhaust system be checked promptly, especially in winter?","Vehicle Maintenance","It makes the tires wear faster","It changes the licence class","It prevents the heater from working","Exhaust gases can enter a closed vehicle and create a serious hazard","D","A faulty exhaust can allow dangerous gases into the passenger compartment, especially when windows and vents are closed.","hard",true,"Exhaust systems","maintenance"],
  [57,"What maximum tire age does the handbook advise drivers not to exceed?","Tire Safety","Ten years","Five years","Fifteen years","Twenty years","A","Tires deteriorate with age even when unused and should not be older than 10 years.","hard",false,"Tire age","maintenance"],
  [58,"When should a typical passenger-vehicle tire be replaced because of tread depth?","Tire Safety","Below three millimetres","Below 1.5 millimetres or when tread-wear indicators contact the road","Only when completely smooth","Below five millimetres","B","For typical passenger vehicles, replace a tire when tread is under 1.5 millimetres or tread-wear indicators reach the road.","hard",true,"Tread depth","maintenance"],
  [59,"What tire setup is recommended for the best winter traction?","Winter Tires","Two winter tires on the drive axle only","Different tread patterns on every wheel","Four winter or all-weather tires with the same tread pattern","One winter tire as a spare only","C","Four matching winter or all-weather tires provide more balanced traction and control.","medium",true,"Matching tires","maintenance"],
  [60,"When an Ontario vehicle owner sells or changes vehicles, what happens to the licence plates?","Vehicle Registration","They must stay permanently with the sold vehicle","They are destroyed by the buyer","They automatically become the dealer's property","They move with the plate owner and should be removed from the vehicle","D","Ontario uses a plate-to-owner system, so plates remain with the owner rather than the vehicle.","medium",true,"Plate ownership","maintenance"],
  [61,"How soon must a new Ontario resident generally register an owned vehicle in Ontario?","Vehicle Registration","Within 30 days","Within 60 days","Within six months","At the next licence renewal","A","New residents generally have 30 days to register their vehicles and obtain Ontario plates and a permit.","hard",true,"New residents","maintenance"],
  [62,"What must you show before registering a vehicle or renewing its registration?","Vehicle Insurance","A recent fuel receipt","Proof of automobile insurance","A road-test score","A parking permit","B","Ontario requires proof of insurance before a vehicle can be registered or its registration renewed.","easy",true,"Proof of insurance","maintenance"],
  [63,"What should you do if asked to sign blank repair or medical forms after a collision?","Insurance Fraud Prevention","Sign them to speed up the claim","Let a tow operator complete them later","Refuse to sign blank forms","Sign only the final page","C","Do not sign blank forms. Obtain and review detailed documents for services connected to a collision.","medium",false,"Blank forms","maintenance"],
  [64,"Why should fluid leaks be inspected by a qualified specialist?","Vehicle Maintenance","They always mean the tires are overinflated","They improve engine cooling","They are required for winter driving","They may damage the vehicle and harm the environment","D","Prompt inspection can prevent mechanical damage and environmental contamination.","medium",false,"Fluid leaks","maintenance"],
  [65,"What are benefits of maintaining correct tire pressure?","Tire Maintenance","Lower fuel use, fewer emissions and more even tire wear","Shorter vehicle length","Brighter headlights","A higher legal speed limit","A","Proper inflation supports safety and reduces rolling resistance, fuel use, emissions and unnecessary tire wear.","easy",true,"Tire pressure","maintenance"],

  [66,"Which licence may tow a trailer with a gross vehicle weight up to 4,600 kilograms, subject to other limits?","Trailer Towing","Only Class A","A valid Class G1, G2, G or higher licence","Only a full Class G with ten years' experience","No licence is required","B","A valid G1, G2, G or higher class may tow a trailer up to 4,600 kilograms, provided vehicle and legal limits are met.","hard",true,"Licence class","towing"],
  [67,"How many trailers may a non-commercial vehicle tow at one time?","Trailer Towing","Three","Two","One","Any number if each is registered","C","It is against the law for a non-commercial vehicle to tow more than one trailer.","easy",true,"Number of trailers","towing"],
  [68,"What must be done before towing a trailer on a public road?","Trailer Registration","Attach the tow vehicle's rear plate to the trailer","Obtain only an insurance sticker","Paint an identification number on the side","Register the trailer and display its own plate while carrying its permit or a copy","D","A trailer is a separate vehicle and must be registered, plated and accompanied by its permit or a copy.","medium",true,"Registration and permit","towing"],
  [69,"At what gross trailer weight must a trailer have brakes strong enough to stop and hold it?","Trailer Brakes","1,360 kilograms or more","500 kilograms or more","2,500 kilograms or more","4,600 kilograms or more","A","A trailer with a gross weight, including its load, of 1,360 kilograms or more must have adequate brakes.","hard",true,"Brake threshold","towing"],
  [70,"Which rear lighting and reflector equipment is required on a trailer?","Trailer Lighting","A blue tail light only","A white plate light, red tail light and two widely spaced red rear reflectors","Two white rear lights only","A green rotating light","B","A trailer requires a white licence-plate light, a red tail light and two red reflectors at the rear.","hard",false,"Rear lighting","towing"],
  [71,"What extra visibility equipment is required when a trailer load blocks the driver's rear view?","Trailer Equipment","A rooftop beacon","A rear passenger acting as a guide","Additional mirrors providing a clear view of the road behind","A louder horn","C","When the load blocks the normal rear view, additional mirrors must provide a clear view behind the combination.","medium",true,"Rear-view mirrors","towing"],
  [72,"How many independent means of attachment must connect a trailer to its tow vehicle?","Trailer Attachment","One","Three","Four","Two, so one remains if the other fails","D","A trailer must have two separate attachment methods, normally the primary hitch plus safety chains or cables.","hard",true,"Redundant attachment","towing"],
  [73,"How should trailer safety chains be arranged under the tongue?","Trailer Attachment","Crossed under the tongue","Wrapped around the hitch ball","Left hanging loosely","Attached only on one side","A","Crossing the chains creates a cradle that can keep the tongue from striking the road if the hitch disconnects.","medium",true,"Safety chains","towing"],
  [74,"Who may ride in a trailer while it is being towed?","Trailer Occupants","Passengers wearing seatbelts","No person may ride in a towed trailer","Only adults","Only the trailer owner","B","No passengers may be carried in any trailer, including house and boat trailers, while it is being towed.","easy",true,"Passenger prohibition","towing"],
  [75,"How should a trailer hitch sit when the trailer is attached and tightened?","Trailer Hitch","Tilted sharply downward","Higher on one side","Level, without tilting","Resting on the safety chains","C","The hitch ball and trailer should be level when properly attached; excessive rear sag may require load adjustment or an equalizing hitch.","medium",false,"Level attachment","towing"],
  [76,"How much of a trailer's total loaded weight should generally be supported on the hitch?","Trailer Loading","About one per cent","About 20 to 25 per cent","Half the total weight","About five to 10 per cent, within the hitch rating","D","Proper hitch weight is generally five to 10 per cent of total trailer weight, within the marked limit.","hard",true,"Hitch weight","towing"],
  [77,"Where should most trailer cargo weight generally be placed relative to the axle?","Trailer Loading","More weight ahead of the axle than behind it","All weight behind the axle","All weight at the rear door","Only on one side","A","More weight should generally be ahead of the axle to create proper hitch weight and reduce sway.","hard",true,"Weight distribution","towing"],
  [78,"Why is too much trailer weight behind the axle dangerous?","Trailer Loading","It improves steering too much","It can cause sway or fishtailing and may separate the hitch","It prevents the trailer brakes from working at all","It makes the trailer too visible","B","Rear-heavy loading reduces stable hitch weight and can produce sway, fishtailing or hitch separation.","hard",true,"Rear-heavy loading","towing"],
  [79,"What should be checked before every trip with a trailer?","Trailer Inspection","Only the trailer colour","Only the tow vehicle's fuel level","Hitch, wheels, tires, lights, load distribution and load security","Only the licence plate","C","A complete pre-trip check covers the connection, running gear, lights and the balance and security of the load.","easy",true,"Pre-trip inspection","towing"],
  [80,"Why should a driver towing a trailer increase following distance?","Trailer Stopping","To help other vehicles pass on the right","To keep the trailer lights cooler","To improve radio reception","The longer, heavier combination needs more room for smooth stops and to avoid jackknifing or load shift","D","Extra space allows gradual braking and reduces the risk of a jackknife, sideways slide or shifted load.","medium",true,"Stopping distance","towing"],
  [81,"What extra consideration is required before passing while towing a trailer?","Trailer Passing","Allow substantially more time and distance for the longer, slower-accelerating combination","Pass only on the shoulder","Use hazard lights instead of a turn signal","Move back immediately after clearing the other vehicle","A","A towing combination accelerates more slowly and is longer, so a safe pass requires additional time, room and clearance before returning.","medium",true,"Passing clearance","towing"],
  [82,"What should you do if air turbulence from a passing truck pushes your trailer sideways?","Trailer Control","Brake hard immediately","Do not brake; steer carefully back into position, with a slight speed increase if needed","Turn sharply away from the truck","Stop in the traffic lane","B","Hard braking can worsen trailer instability. Hold a steady course and gently restore the combination's position.","hard",false,"Air turbulence","towing"],
  [83,"Which way should you initially steer the tow vehicle to make the rear of a trailer move right while backing?","Trailer Backing","Right","Straight ahead","Left","Either direction","C","Steering the tow vehicle left makes the trailer's rear move right. Use small corrections and back very slowly.","hard",false,"Reverse steering","towing"],
  [84,"Why should a disabled vehicle with power steering and power brakes not be flat-towed when its engine cannot run?","Disabled-Vehicle Towing","The horn will not work","The licence plate may fall off","The headlights will be too bright","Steering and braking become difficult without engine assistance","D","Without engine power, steering and braking assistance may be lost, making the towed vehicle difficult and unsafe to control.","hard",true,"Power assistance","towing"],
  [85,"Why should you not try to start a disabled vehicle by towing it?","Disabled-Vehicle Towing","It is dangerous and can damage both vehicles","It always erases the vehicle registration","It prevents the tow cable from tightening","It is permitted only at night","A","Towing a vehicle to start it can cause loss of control or mechanical damage and should not be attempted.","medium",false,"Tow starting","towing"],

  [86,"How can trip planning reduce fuel use and emissions?","Efficient Driving","Drive each errand separately","Combine several errands into one trip","Choose the busiest travel period","Carry extra cargo for stability","B","Combining errands reduces cold starts and total distance, saving fuel and lowering emissions.","easy",false,"Combining trips","efficiency"],
  [87,"Why can travelling outside rush hour be more efficient?","Efficient Driving","Speed limits do not apply","Fuel is cheaper at that time","The trip may take less time with less idling and fewer emissions","The vehicle becomes lighter","C","Off-peak travel can reduce congestion, travel time, fuel consumption and emissions.","medium",false,"Off-peak travel","efficiency"],
  [88,"Why should unnecessary cold-engine starts be avoided?","Efficient Driving","They flatten every tire","They invalidate insurance","They cool the transmission permanently","A cold start releases a large burst of pollutants","D","Starting a cold engine produces a concentrated burst of pollutants, so unnecessary starts should be avoided.","medium",false,"Cold starts","efficiency"],
  [89,"What does the handbook recommend when a vehicle will be parked for more than about 10 seconds?","Efficient Driving","Turn off the engine when it is safe and practical","Keep the engine at high idle","Rev the engine repeatedly","Turn on high beams","A","Avoid unnecessary idling. The handbook recommends turning the vehicle off when parked for more than about 10 seconds.","hard",false,"Idling","efficiency"],
  [90,"How does driving at unnecessarily high speed affect efficiency?","Efficient Driving","It always reduces fuel use","It uses more fuel and increases the risk of a serious collision","It eliminates exhaust emissions","It improves tire life","B","Higher speeds increase fuel consumption and collision severity, so obey posted limits and choose a safe speed.","easy",true,"Speed and fuel use","efficiency"],
  [91,"Why should unnecessary heavy items be removed from a vehicle?","Efficient Driving","They block the radio signal","They change the licence class","Extra weight increases the energy and fuel needed to move the vehicle","They make headlights flash","C","Carrying unnecessary weight, including heavy baggage or accumulated snow and sand, increases fuel use.","medium",false,"Vehicle weight","efficiency"],
  [92,"What should you do with roof racks and cargo boxes when they are not needed?","Efficient Driving","Leave them installed for protection","Fill them with ballast","Open them while driving","Remove them to reduce aerodynamic drag","D","Unused roof equipment increases drag, especially at higher speed, so remove it when practical.","medium",false,"Aerodynamic drag","efficiency"],
  [93,"At high speed, which ventilation choice may be more fuel-efficient than driving with windows open?","Efficient Driving","Using air conditioning sensibly","Running the heater at maximum","Opening every window and sunroof","Turning off all ventilation","A","At high speed, open windows can create substantial drag, so sensible air-conditioning use may consume less fuel.","hard",false,"High-speed ventilation","efficiency"],
  [94,"Why should you avoid topping off the fuel tank after the pump stops?","Efficient Driving","It makes the tires underinflated","Spilled fuel releases harmful vapours","It changes the fuel grade","It disables the fuel gauge","B","Overfilling can spill fuel and release harmful vapours into the environment.","medium",false,"Refuelling","efficiency"],
  [95,"How does regular engine and brake maintenance affect fuel efficiency?","Efficient Driving","It has no effect on fuel consumption","It permits higher speed limits","A tuned engine and freely operating brakes reduce wasted fuel","It makes the vehicle heavier","C","Worn spark plugs, dragging brakes and other maintenance problems can substantially increase fuel consumption.","medium",false,"Mechanical efficiency","efficiency"],

  [96,"Does Ontario's hand-held device ban apply while stopped at a red light?","Distracted Driving","No, because the vehicle is not moving","Only on freeways","Only if pedestrians are present","Yes, the restriction applies while driving, including when stopped in traffic or at a red light","D","A driver may not use a prohibited hand-held device merely because the vehicle is temporarily stopped in traffic or at a signal.","easy",true,"Stopped in traffic","situations"],
  [97,"When may a driver use a hand-held phone to make an emergency call while driving?","Distracted Driving","To call 911 in an emergency","To check traffic congestion","To call a passenger","To program navigation","A","The hand-held communication-device rule provides an exception for calling 911 in an emergency.","medium",true,"Emergency exception","situations"],
  [98,"When may a driver view a GPS display?","Distracted Driving","Only while holding it near the steering wheel","When it is built into the dashboard or securely mounted","Whenever a video is also displayed","Only when travelling below 40 km/h","B","A navigation screen may be viewed when integrated into the dashboard or securely mounted; programming should be done safely and legally.","medium",true,"Mounted navigation","situations"],
  [99,"What must you do on a multi-lane road when approaching a stopped emergency vehicle or tow truck with required lights flashing?","Stopped Emergency Vehicles","Maintain speed in the nearest lane","Stop in the lane beside it","Slow down, proceed cautiously and move to a lane away when it is safe","Sound the horn and pass on the shoulder","C","Drivers must reduce speed and proceed cautiously, and on roads with two or more same-direction lanes, move over when safe.","hard",true,"Slow down and move over","situations"],
  [100,"What does a flashing green light on a firefighter's or volunteer medical responder's personal vehicle mean?","Volunteer Responders","The vehicle has the same legal powers as a police cruiser","The road is closed","You must follow within 150 metres","Yield the right-of-way when safe to help the responder reach the emergency","D","A flashing green light identifies a volunteer responder. Drivers should courteously yield when it is safe to do so.","medium",true,"Flashing green light","situations"]
]
$question_bank$::jsonb) as source(item);

do $$
declare
  issue_count integer;
begin
  if (select count(*) from new_rules_question_batch) <> 100 then
    raise exception 'Expected exactly 100 authored rules questions';
  end if;

  if (select count(distinct lower(btrim(question_text))) from new_rules_question_batch) <> 100 then
    raise exception 'Authored rules questions contain duplicate question text';
  end if;

  select count(*) into issue_count
  from new_rules_question_batch q
  where q.authoring_id not between 1 and 100
     or q.correct_option not in ('A', 'B', 'C', 'D')
     or q.difficulty_level not in ('easy', 'medium', 'hard')
     or (select count(distinct option_value) from unnest(array[
       lower(btrim(q.option_a)), lower(btrim(q.option_b)),
       lower(btrim(q.option_c)), lower(btrim(q.option_d))
     ]) option_value) <> 4
     or btrim(q.question_text) = ''
     or btrim(q.explanation) = ''
     or btrim(q.category) = ''
     or btrim(q.subcategory) = ''
     or btrim(q.learning_topic) = ''
     or btrim(q.handbook_section) = ''
     or q.handbook_url !~ '^https://www[.]ontario[.]ca/';

  if issue_count <> 0 then
    raise exception 'Authored rules questions failed structural validation: % issue(s)', issue_count;
  end if;

  if exists (
    select 1
    from (
      select correct_option, count(*) as answer_count
      from new_rules_question_batch
      group by correct_option
    ) distribution
    where answer_count <> 25
  ) then
    raise exception 'Correct-answer positions must contain exactly 25 questions each';
  end if;

  if exists (
    select 1
    from new_rules_question_batch authored
    join public.rules_questions existing
      on lower(btrim(existing.question_text)) = lower(btrim(authored.question_text))
  ) then
    raise exception 'One or more authored questions already exist in rules_questions';
  end if;
end
$$;

insert into public.rules_questions (
  question_text,
  category,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  explanation,
  difficulty_level,
  is_frequently_tested,
  is_active,
  subcategory,
  learning_topic,
  handbook_section,
  handbook_url
)
select
  question_text,
  category,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  explanation,
  difficulty_level,
  is_frequently_tested,
  true,
  subcategory,
  learning_topic,
  handbook_section,
  handbook_url
from new_rules_question_batch
order by authoring_id;

do $$
begin
  if (
    select count(*)
    from public.rules_questions existing
    join new_rules_question_batch authored
      on lower(btrim(existing.question_text)) = lower(btrim(authored.question_text))
    where existing.is_active = true
  ) <> 100 then
    raise exception 'Not all 100 authored rules questions were inserted as active records';
  end if;
end
$$;

commit;
