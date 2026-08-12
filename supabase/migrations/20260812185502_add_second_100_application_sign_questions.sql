begin;

create temporary table new_sign_question_batch (
  authoring_id integer primary key,
  source_image_key text not null,
  question_text text not null,
  option_a text not null,
  option_b text not null,
  option_c text not null,
  option_d text not null,
  correct_option text not null,
  explanation text not null
) on commit drop;

insert into new_sign_question_batch
select
  (item->>0)::integer,
  item->>1,
  item->>2,
  item->>3,
  item->>4,
  item->>5,
  item->>6,
  item->>7,
  item->>8
from jsonb_array_elements($questions$
[
  [1,"question-25-Question_25.png","You need the destination shown on this green direction board. What should you do?","Read the arrows early and move into the correct lane when safe","Stop beneath the sign to confirm the route","Follow the largest place name regardless of your destination","Wait for a regulatory sign before choosing a lane","A","Direction boards help drivers choose routes and lanes. Read the destination and arrow early, then change lanes safely if needed."],
  [2,"question-25-Question_25.png","What kind of information does this green board provide?","A mandatory minimum speed","Directions to named destinations","A warning of an immediate road hazard","A prohibition on entering the listed cities","B","Green information and direction signs show destinations and the routes or directions used to reach them."],
  [3,"question-48-Question_48.png","A cyclist ahead gives this hand signal. What movement should you anticipate?","The cyclist will stop immediately","The cyclist will turn left","The cyclist intends to turn right","The cyclist is inviting you to pass","C","The cyclist's raised and bent left arm indicates an intended right turn."],
  [4,"question-48-Question_48.png","How should you respond before passing a cyclist signalling a right turn?","Pass quickly on the cyclist's right","Sound the horn and continue at the same speed","Move into the bicycle lane","Wait, leave space and avoid crossing the cyclist's turning path","D","Do not pass through the path of a cyclist who is preparing to turn right. Leave space and proceed only when safe."],
  [5,"question-49-Question_49.png","What should you do when a cyclist ahead signals that they are slowing or stopping?","Reduce speed and increase your following distance","Move immediately beside the cyclist","Accelerate before the cyclist stops","Use the shoulder to pass","A","A downward hand signal warns that the cyclist is slowing or stopping. Increase space and be ready to stop."],
  [6,"question-49-Question_49.png","Which action is least appropriate after this cyclist signal?","Checking traffic behind before changing position","Overtaking immediately without allowing for the cyclist to stop","Covering the brake","Maintaining a safe lateral gap","B","The cyclist may slow abruptly or move while stopping, so an immediate close pass is unsafe."],
  [7,"question-50-question_50.png","A cyclist extends the left arm straight out. What should you expect?","A right turn","A stop","A left turn","A request for you to pass","C","A cyclist extending the left arm horizontally is signalling a left turn."],
  [8,"question-50-question_50.png","Why should a driver avoid passing on the cyclist's left after this signal?","The cyclist must move onto the sidewalk","The cyclist has priority over every road user","Passing is always illegal near a cyclist","The cyclist may move left across the driver's path","D","A left-turning cyclist may need to move toward the centre or into a turn lane. Give the cyclist room."],
  [9,"question-52-Question_52.png","What adjustment should you begin after this speed-change-ahead sign?","Reduce speed smoothly so you can comply with the 50 km/h limit ahead","Stop beside the sign","Accelerate to 50 km/h even in poor conditions","Move onto the shoulder","A","The upward arrow means the posted speed changes ahead. Adjust smoothly so you are at or below the new limit when it takes effect."],
  [10,"question-52-Question_52.png","How can you distinguish this sign from a current maximum-speed sign?","It has a yellow background","The arrow shows that the new limit begins ahead","It applies only to trucks","It displays a distance in kilometres","B","The arrow above 50 gives advance notice of a speed-limit change rather than simply posting the current maximum."],
  [11,"question-54-Question_54.png","Several chevron signs point around a sharp right-hand curve. How should you drive?","Keep straight until the final chevron","Cross the centreline to reduce steering","Reduce speed and follow the direction of the chevrons","Stop at each chevron","C","Chevron signs guide drivers around a sharp curve. Slow before the curve and follow the indicated direction."],
  [12,"question-54-Question_54.png","What does the checkerboard border emphasize on this chevron?","Parking is allowed near the curve","The road becomes one-way","The arrow is a lane-use command","The curve presents a significant hazard requiring caution","D","The checkerboard border highlights danger at a sharp bend; it is not a turn-only lane sign."],
  [13,"question-56-Question_56.png","What does the 50 km/h value on this yellow ramp sign represent?","The maximum safe speed for the ramp under favourable conditions","A minimum speed that all drivers must maintain","The speed limit on the road you are leaving","A speed that applies only at night","A","The yellow advisory sign shows the maximum safe speed for the ramp or curve, not a minimum target."],
  [14,"question-56-Question_56.png","Should you always travel at exactly 50 km/h after this advisory sign?","Yes, even in snow or heavy rain","No; conditions may require a lower safe speed","Yes, unless another driver is behind you","No, because the sign prohibits 50 km/h","B","The advisory value assumes favourable conditions. Weather, traffic or vehicle limits may require a lower speed."],
  [15,"question-58-Question_58.png","What does this blue wheelchair symbol help you locate?","A mandatory hospital route","A pedestrian-only road","Facilities or services accessible to wheelchair users","A place where every vehicle may park","C","The blue information symbol identifies facilities or services that are accessible by wheelchair."],
  [16,"question-58-Question_58.png","Does this information symbol alone allow a vehicle to use an accessible parking space?","Yes, if the driver remains inside","Yes, for up to ten minutes","Yes, when ordinary spaces are full","No; accessible parking still requires the appropriate permit","D","An accessibility symbol can identify accessible facilities, but reserved parking remains subject to permit requirements."],
  [17,"question-59-Question_59.png","How should you use the diagonal stripes on this hazard marker?","Follow their downward direction to identify the safe side to pass","Stop and reverse whenever the marker appears","Drive on the side where the stripes rise","Ignore them unless lights are flashing","A","A hazard marker identifies an obstruction near the roadway, and the downward stripes indicate the side on which it may be safely passed."],
  [18,"question-59-Question_59.png","What does this black-and-yellow marker warn about?","A school zone","A fixed hazard or obstruction close to the road","A temporary speed increase","A two-way left-turn lane","B","The striped marker highlights a roadside obstruction or hazard and helps guide traffic around it."],
  [19,"question-60-Question_60.png","Your car carries two people and this HOV sign requires three or more. What must you do?","Use the lane only to pass","Enter if traffic is congested","Remain outside the HOV lane","Drive in the HOV lane with hazard lights on","C","The sign reserves the lane for vehicles with at least three occupants. A two-person vehicle does not qualify."],
  [20,"question-60-Question_60.png","What determines whether a passenger vehicle may use the signed HOV lane?","Its engine size","Whether it is travelling at the speed limit","Whether the regular lanes are busy","Meeting the posted occupancy and any applicable time conditions","D","HOV eligibility is set by the posted minimum number of occupants and any accompanying schedule or vehicle symbols."],
  [21,"question-61-Question_61.png","Your vehicle is 4.0 metres high. What should you do at this 3.9-metre clearance warning?","Do not proceed beneath the obstruction; use a safe alternate route","Deflate the tires and continue","Drive through the centre at high speed","Proceed if no vehicle is approaching","A","A vehicle taller than the posted clearance may strike the obstruction. Do not proceed."],
  [22,"question-61-Question_61.png","What measurement must a driver compare with the 3.9-metre value?","The vehicle's length","The vehicle's total height, including its load","The distance between axles","The width of the mirrors","B","The clearance must exceed the vehicle's full height, including roof equipment or cargo."],
  [23,"question-62-Question_62.png","What should you do after this snowmobile-crossing warning sign?","Stop until a snowmobile appears","Move onto the shoulder","Slow down and watch for snowmobiles crossing the road","Assume snowmobiles will yield from every direction","C","The yellow warning sign indicates snowmobiles may cross. Scan both sides and be prepared to stop."],
  [24,"question-62-Question_62.png","How does this sign differ from a green snowmobile sign?","It prohibits snowmobiles","It creates a snowmobile-only road","It gives snowmobiles priority","It warns of a crossing rather than granting road use","D","A yellow diamond warns drivers about a crossing; a green circle is a permissive regulatory symbol."],
  [25,"question-63-Question_63.png","May you overtake another vehicle between this sign and the pedestrian crossover?","No; passing is prohibited up to the crossover","Yes, if no pedestrian is visible","Yes, on the right shoulder","Only if the vehicle ahead is turning","A","The sign prohibits passing from its location to the pedestrian crossover so drivers do not obscure pedestrians or stopped vehicles."],
  [26,"question-63-Question_63.png","Why is passing restricted before the crossover?","To reserve a lane for bicycles","A passing vehicle could hide a pedestrian or a stopped vehicle from view","To create space for parking","Because the speed limit ends at the crossover","B","A stopped or slowing vehicle may be yielding to a pedestrian. Passing it could place the pedestrian in danger."],
  [27,"question-64-Question_64.png","What should you do as you approach this school-crossing sign?","Maintain speed because children must wait","Pass a crossing guard before traffic stops","Slow down, watch for children and obey the crossing guard","Stop beside the sign even when the crossing is empty","C","A school-crossing sign warns that children may cross. Approach cautiously and follow the crossing guard's directions."],
  [28,"question-64-Question_64.png","What does the arrow panel beneath the school-crossing symbol identify?","The direction to the nearest school","A mandatory turn for school buses","The end of the school zone","The location or direction of the crossing","D","The arrow helps drivers identify where the school crossing is located."],
  [29,"question-65-Question_65.png","The yellow lights on this school-zone sign are flashing. What maximum speed applies?","The posted 40 km/h maximum","The normal road limit plus 10 km/h","A minimum of 40 km/h","The speed of surrounding traffic","A","When the lights flash, drivers must obey the 40 km/h maximum displayed on the sign."],
  [30,"question-65-Question_65.png","What should you do when the school-zone lights are not flashing?","Ignore all school-zone hazards","Obey the otherwise posted limit while continuing to watch for children","Drive at any speed below 80 km/h","Stop until the lights begin flashing","B","The flashing schedule activates the displayed school-zone maximum. At other times, obey the applicable posted limit and remain alert."],
  [31,"question-66-Question_66.png","A school bus has its red lights flashing and stop arm extended. What must you do?","Pass slowly on the left","Stop only if children are visible","Stop as required and do not pass the bus","Sound the horn before proceeding","C","Flashing red lights and the extended stop arm require drivers to stop under Ontario's school-bus rules."],
  [32,"question-66-Question_66.png","When may you proceed after stopping for this school bus?","As soon as your lane is clear","After waiting exactly five seconds","When the bus driver waves from inside","Only after the red lights stop flashing and the stop arm is no longer extended","D","Remain stopped until the bus signals are no longer operating and it is safe and lawful to proceed."],
  [33,"question-67-Question_67.png","You are travelling to the airport. How should you use this green sign?","Follow the indicated airport route or direction","Stop beneath the sign for inspection","Expect aircraft to cross the road","Enter only if carrying a passenger","A","The aircraft symbol on a green information sign shows the route or direction to an airport."],
  [34,"question-67-Question_67.png","What sign category does this airport-route marker belong to?","Regulatory prohibition","Information and direction","Temporary construction","Railway warning","B","Green signs with service symbols guide drivers to destinations and facilities."],
  [35,"question-68-Question_68.png","What can the group of symbols on this information sign help you find?","Mandatory vehicle inspection points","A new speed limit","Nearby off-road services and facilities","A road-closure detour","C","Service-symbol signs identify facilities such as hospitals, airports, universities or carpool lots."],
  [36,"question-68-Question_68.png","Are you required to leave the road when you see this facilities sign?","Yes, if any symbol is familiar","Yes, during daylight hours","Yes, when the road is busy","No; use the information only if you need a listed service","D","Information signs guide drivers to optional services; they do not require an exit."],
  [37,"question-13-Question_13.png","You have stopped at this sign, but a hedge blocks your view of cross traffic. What should you do next?","Move forward cautiously only after the complete stop, yielding until the way is clear","Accelerate into the intersection before another vehicle arrives","Sound the horn and proceed without checking","Reverse and approach in the opposing lane","A","After making the required complete stop, edge forward cautiously only as needed for a clear view and yield before entering."],
  [38,"question-13-Question_13.png","At an all-way stop, you and a vehicle to your right stop at the same time. Who should proceed first?","The larger vehicle","The vehicle on your right","The vehicle travelling faster","The vehicle that sounds its horn","B","When vehicles arrive at an all-way stop at the same time, the driver on the left yields to the driver on the right."],
  [39,"question-70-Question_70.png","What should you be prepared to do at the lifting bridge ahead?","Enter quickly before the bridge rises","Move into the opposing lane","Obey lights, gates and signs and stop if the bridge is opening","Stop beside the warning sign in every case","C","A lifting bridge may open for boats. Follow its traffic controls and never enter when the crossing is closed."],
  [40,"question-70-Question_70.png","Why must you avoid entering when bridge gates or warning lights operate?","The road becomes a passing lane","The bridge speed limit doubles","Boats must yield to road traffic","The bridge deck may be raised or unavailable to vehicles","D","The moving bridge span can create an open or unsafe roadway, so drivers must obey the closure controls."],
  [41,"question-71-Question_71.png","What path should you anticipate after this reverse-turn warning sign?","A right curve followed by a left curve","A left curve followed by a right curve","Several curves beginning to the left","A divided highway beginning","A","The symbol shows two successive changes in direction, first right and then left."],
  [42,"question-71-Question_71.png","How should you prepare for the two bends shown?","Accelerate through the first bend","Reduce speed before the first bend and steer smoothly through both","Drive on the centreline","Pass before reaching the second bend","B","Slow before entering and maintain lane control through both changes in direction."],
  [43,"question-72-Question_72.png","What does a green circle around an activity normally indicate?","The activity is mandatory","The activity is prohibited","The activity is permitted","The activity is hazardous","C","Ontario regulatory signs use a green circle to show that the pictured activity is permitted."],
  [44,"question-72-Question_72.png","Does a green permissive symbol remove all other road restrictions?","Yes, at all times","Yes, for passenger vehicles","Yes, if traffic is light","No; posted times, lane rules and other controls still apply","D","Permission shown by one symbol remains subject to any accompanying conditions and other traffic laws."],
  [45,"question-73-Question_73.png","This green sign permits passing. When may you actually pass?","Only when markings, sight distance and traffic also make the manoeuvre legal and safe","Immediately, even on a curve","Only by using the shoulder","Whenever the vehicle ahead is below the limit","A","A permissive sign does not override unsafe conditions, pavement markings or other passing restrictions."],
  [46,"question-73-Question_73.png","Does this sign require you to overtake the vehicle ahead?","Yes, before the next intersection","No; it permits passing but does not make passing mandatory","Yes, if the other vehicle is a truck","No, because it prohibits passing","B","The green circle indicates permission. A driver may remain behind another vehicle when passing is unnecessary or unsafe."],
  [47,"question-74-Question_74.png","You have completed a pass on a multilane road with this sign. What should you do?","Remain in the left lane until your exit","Move onto the shoulder","Return to the right lane when it is safe","Reduce speed below all other traffic","C","The sign instructs drivers to keep right except while passing. Return safely after completing the pass."],
  [48,"question-74-Question_74.png","What traffic behaviour is this sign designed to reduce?","Signalling before lane changes","Passing slower traffic on the left","Maintaining a safe following distance","Unnecessary travel in the left lane","D","Keeping the left lane available for passing improves traffic flow and reduces conflicts."],
  [49,"question-75-Question_75.png","What does a red circle with a diagonal slash communicate?","The pictured activity is prohibited","The pictured activity is recommended","The road is under construction","The activity is allowed only at night","A","A red circle and slash is the standard regulatory symbol for an activity that is not allowed."],
  [50,"question-75-Question_75.png","What additional information is needed to interpret this general prohibition symbol?","The road's speed limit","The picture or movement shown inside the circle","The nearest destination name","The colour of the vehicle ahead","B","The symbol inside the red slash identifies the specific movement, vehicle or activity that is prohibited."],
  [51,"question-76-Question_76.png","What movement must traffic in the signed lane make?","Turn left","Continue straight","Turn right","Make a U-turn","C","The white curved arrow on a black lane-use sign directs traffic to turn right."],
  [52,"question-76-Question_76.png","Your destination is straight ahead but your lane has this sign. What should you do?","Stop beneath the sign","Continue straight from the signed lane","Reverse to the previous intersection","Change to an appropriate lane when safe before reaching the turn","D","The signed lane is right-turn-only. Move safely to a through lane before the lane-use control takes effect."],
  [53,"question-77-Question_77.png","What should you anticipate after this sign showing an upward arrow over 80?","The speed limit changes ahead to 80 km/h","The current minimum speed is 80 km/h","The road ends after 80 kilometres","Only trucks may travel at 80 km/h","A","The arrow above 80 gives advance notice that the speed limit changes ahead."],
  [54,"question-77-Question_77.png","When should your speed comply with the new 80 km/h maximum?","Only after another vehicle accelerates","By the point where the new limit takes effect","Immediately by accelerating, even in traffic","Only during daylight hours","B","Adjust speed smoothly so you comply when the new limit begins; never exceed the current limit or a speed safe for conditions."],
  [55,"question-78-Question_78.png","What does this black-and-white 80 km/h sign establish?","A recommended curve speed","A minimum freeway speed","The maximum legal speed under ideal conditions","The speed required in every weather condition","C","A standard maximum-speed sign sets the legal maximum; it is not a target when conditions require slower travel."],
  [56,"question-78-Question_78.png","May you drive below 80 km/h on this road?","No, the sign sets a mandatory speed","Only if hazard lights are on","Only in the right lane","Yes, when traffic, weather or road conditions require a lower safe speed","D","Drivers must not exceed the maximum and must reduce speed whenever conditions make 80 km/h unsafe."],
  [57,"question-79-Question_79.png","It is 8:00 a.m. on Monday. What does this sign require?","Do not turn right","Turn right only","Do not travel straight","Stop for three minutes before turning","A","The sign prohibits right turns during the posted weekday time periods, including 8:00 a.m. Monday."],
  [58,"question-79-Question_79.png","May you turn right outside the posted restricted times?","Always, without stopping","Only if other signs, signals and traffic rules permit the turn","Only from the left lane","Never at this intersection","B","Outside the listed times, the timed prohibition does not apply, but every other control and safety requirement still does."],
  [59,"question-80-Question_80.png","At 5:00 p.m. on a weekday, which movement does this timed sign prohibit?","Turning right","Continuing straight","Turning left","Entering the intersection from the opposite direction","C","The sign prohibits left turns during the listed weekday morning and afternoon periods."],
  [60,"question-80-Question_80.png","Your route requires a left turn while the restriction is active. What should you do?","Wait in the intersection until the time ends","Turn from the right lane","Make a U-turn instead","Continue and use a legal alternative route","D","Do not make the prohibited turn. Continue safely and choose another lawful route."],
  [61,"question-81-Question_81.png","Which movements are prohibited by this sign?","Left and right turns","Straight travel and U-turns","Right turns only","All movement through the intersection","A","The red slash covers both curved arrows, prohibiting turns to either the left or right."],
  [62,"question-81-Question_81.png","What movement remains available if no other control prohibits it?","A left turn","Continuing straight","A right turn","Stopping in the intersection","B","Because both turns are prohibited, through traffic may continue straight if signals and other signs allow."],
  [63,"question-82-Question_82.png","The sign prohibits going straight and turning right. Which movement may you make?","Continue straight","Turn right","Turn left","Make a U-turn","C","With straight and right movements prohibited, the permitted movement is a left turn."],
  [64,"question-82-Question_82.png","How should you prepare when approaching this left-only movement control?","Remain in any lane and turn suddenly","Enter the intersection before signalling","Use the shoulder to reach the turn","Move into the proper lane, signal and obey the traffic signal","D","Plan the required left turn early, use the correct lane and follow all signal and right-of-way rules."],
  [65,"question-83-Question_83.png","What movement is allowed by this sign?","Turning right","Turning left","Continuing straight","Making a U-turn","A","The sign prohibits the straight and left movements, leaving a right turn as the permitted movement."],
  [66,"question-83-Question_83.png","Your destination lies straight ahead. How should you respond to this control?","Continue straight if no vehicle is nearby","Turn right as directed and find a legal alternate route","Stop until the sign is removed","Drive around the sign on the shoulder","B","The straight movement is prohibited. Follow the permitted right turn and reroute lawfully."],
  [67,"question-84-Question_84.png","What does this lane-use arrow require?","A right turn","Straight travel","A left turn","A U-turn","C","The single curved arrow directs traffic in that lane to turn left."],
  [68,"question-84-Question_84.png","Which action is improper from a lane controlled by this sign?","Signalling before the turn","Yielding to pedestrians","Turning left when permitted by the signal","Continuing straight through the intersection","D","Traffic in a left-turn-only lane must follow the arrow and may not proceed straight."],
  [69,"question-85-Question_85.png","Which movements are permitted from this lane?","Going straight or turning left","Turning right or making a U-turn","Turning left or right","Going straight only","A","The two arrows permit through travel and a left turn from the signed lane."],
  [70,"question-85-Question_85.png","Which movement is not shown as permitted?","Continuing straight","Turning right","Turning left","Entering the intersection on green","B","The sign shows straight and left arrows, so it does not permit a right turn from that lane."],
  [71,"question-86-Question_86.png","What choices does this lane-use sign allow?","Left turn or straight","Left turn or right turn","Straight ahead or right turn","Right turn only","C","The arrows allow through travel or a right turn from the signed lane."],
  [72,"question-86-Question_86.png","Your route requires a left turn. What should you do before this lane reaches the intersection?","Turn left from the signed lane","Stop and wait for a gap in oncoming traffic","Make a U-turn","Change safely to a lane that permits left turns","D","The signed lane does not permit a left turn, so move to an appropriate lane before the intersection when safe."],
  [73,"question-87-Question_87.png","What movements are allowed by this sign?","Left or right turns","Straight travel only","Straight travel or a right turn","All movements including U-turns","A","The arrows permit left and right turns but do not show a through movement."],
  [74,"question-87-Question_87.png","What must you avoid from the lane controlled by this sign?","Choosing the proper turn lane","Driving straight through the intersection","Yielding before turning","Signalling your intended turn","B","The sign permits turns in either direction but does not permit continuing straight."],
  [75,"question-88-Question_88.png","Which movement is not included among this sign's three arrows?","A left turn","A right turn","A U-turn","Straight travel","C","The sign shows left, straight and right movements. It does not show or authorize a U-turn."],
  [76,"question-88-Question_88.png","Does this sign guarantee that every shown movement can be made immediately?","Yes, regardless of the signal","Yes, when another driver is waiting","Yes, because black signs override traffic lights","No; signals, pedestrians, right-of-way and conditions still control the movement","D","Lane-use arrows identify available directions, but drivers must still obey signals and yield as required."],
  [77,"question-89-Question_89.png","What must a snowmobile operator do at a road displaying this sign?","Do not use the prohibited road","Proceed only on the shoulder","Cross anywhere at walking speed","Use the road only after dark","A","The snowmobile symbol with a red slash prohibits snowmobiles from using the road."],
  [78,"question-89-Question_89.png","How does this sign differ from a yellow snowmobile sign?","It warns drivers of a crossing","It prohibits snowmobile use instead of warning about a crossing","It reserves the road for snowmobiles","It applies only in summer","B","The red slash is a regulatory prohibition; a yellow diamond warns that snowmobiles may cross."],
  [79,"question-90-Question_90.png","You are turning across a bicycle path and pedestrian crossing controlled by this sign. Who must you yield to?","Only motor vehicles","Only cyclists travelling faster than you","Cyclists and pedestrians crossing your path","No one if your signal is green","C","The sign explicitly requires turning vehicles to yield to both bicycles and pedestrians."],
  [80,"question-90-Question_90.png","What check is especially important before completing the signed turn?","Looking only through the windshield","Checking the opposite curb after turning","Sounding the horn","Checking mirrors and blind spot for cyclists and pedestrians","D","Cyclists or pedestrians may approach beside the vehicle, so check mirrors and blind spot and yield before crossing their path."],
  [81,"question-91-Question_91.png","A cyclist faces this bicycle-yield sign before crossing a vehicle lane. What must the cyclist do?","Slow or stop as needed and yield to vehicles","Assume vehicles will stop","Ride against traffic","Enter first if travelling straight","A","The yield symbol applies to bicycles, requiring cyclists to give right-of-way to vehicles before proceeding."],
  [82,"question-91-Question_91.png","Does this sign remove a driver's duty to drive carefully around cyclists?","Yes, drivers may ignore the crossing","No; drivers must still watch for cyclists and avoid a collision","Yes, when the driver has a green light","No, because cyclists always have priority","B","The cyclist has a yield duty, but drivers must remain alert and take reasonable steps to avoid a collision."],
  [83,"question-92-Question_92.png","The signal is red. Where does this sign direct you to stop?","At any point in the lane","Past the intersection","At the specified location in the signed lane","Beside the nearest parked vehicle","C","The sign identifies the stopping position for that lane when the traffic signal is red."],
  [84,"question-92-Question_92.png","When may you move beyond the signed stopping point?","After stopping for exactly three seconds","Whenever the lane beside you moves","When no police vehicle is nearby","When the signal permits and the way is clear","D","Remain stopped for the red indication, then proceed only when the signal and intersection conditions allow."],
  [85,"question-93-Question_93.png","What should you prepare to do after this yield-sign-ahead warning?","Slow down and be ready to yield or stop at the upcoming sign","Stop immediately beside the warning sign","Accelerate through the next intersection","Move into the left lane","A","The yellow sign gives advance notice of a yield control ahead, allowing time to reduce speed and scan for traffic."],
  [86,"question-93-Question_93.png","How is this warning sign different from the actual yield sign?","It gives you priority","It announces that the yield requirement is farther ahead","It prohibits all turns","It applies only to commercial vehicles","B","The yellow diamond is advance warning. The red-and-white triangular sign ahead is where the yield rule applies."],
  [87,"question-94-Question_94.png","What should you watch for after this fire-truck-entrance sign?","Buses entering from the left","A railway crossing","Emergency vehicles entering from the right","A truck inspection station","C","The symbol warns that fire trucks may enter the road from the right."],
  [88,"question-94-Question_94.png","How should you respond if a fire truck begins entering with emergency equipment activated?","Race ahead before it enters","Stop beside the warning sign in every case","Pass it on the shoulder","Slow or stop as needed and yield a clear path","D","Emergency vehicles need room to enter and respond. Yield and avoid blocking the entrance."],
  [89,"question-95-Question_95.png","The lights beside this no-passing symbol are flashing. What must you do?","Do not pass","Pass only on the right","Pass if no worker is visible","Stop in the travel lane","A","The sign prohibits passing while its lights are flashing."],
  [90,"question-95-Question_95.png","May you pass when the lights are not flashing?","Yes, under every condition","Only if passing is otherwise legal and safe","Only on a bridge","No, the restriction is permanent","B","When the flashing restriction is inactive, normal pavement markings, sight-distance rules and traffic conditions still determine whether passing is allowed."],
  [91,"question-96-Question_96.png","How should you approach this orange narrow-bridge sign in a work zone?","Maintain speed because it is temporary","Drive partly on the shoulder","Reduce speed and allow safe clearance through the narrowed bridge","Stop until the work zone closes","C","The temporary sign warns that the bridge width is reduced. Slow down and watch oncoming traffic and workers."],
  [92,"question-96-Question_96.png","What does the orange background tell you?","The bridge restriction is optional","The bridge is permanently closed","The sign applies only to trucks","The condition is temporary or construction-related","D","Orange signs indicate temporary conditions such as construction, road work or temporary lane changes."],
  [93,"question-97-Question_97.png","How long should you expect the rough-road condition shown to continue?","For approximately 15 kilometres","Until the next intersection","For 15 metres","Only while lights are flashing","A","The supplementary distance on the sign states that rough-road conditions continue for 15 kilometres."],
  [94,"question-97-Question_97.png","What driving technique is appropriate throughout the rough section?","Follow closely to copy the path ahead","Use a lower safe speed and avoid abrupt steering or braking","Drive on the centreline","Accelerate over every uneven area","B","A lower speed, more following distance and smooth control inputs help maintain traction and vehicle stability."],
  [95,"question-98-Question_98.png","Which road users are prohibited by the symbols on this sign?","Pedestrians and motorcycles","Trucks and buses","Motor vehicles and bicycles","Only vehicles carrying passengers","C","The red slash covers the car and bicycle symbols, prohibiting those road users from the area."],
  [96,"question-98-Question_98.png","What should a prohibited road user do on reaching this sign?","Continue on the shoulder","Proceed when no one is watching","Stop and wait for the sign to change","Use a legal alternative route","D","Do not enter the restricted area; choose another route permitted for your vehicle or bicycle."],
  [97,"question-99-Question_99.png","What should you do after this caution sign warns of slow-moving vehicles?","Reduce speed as needed and be prepared to follow safely","Pass immediately regardless of markings","Stop beside every slow vehicle","Use the opposing lane continuously","A","Slow-moving vehicles may create a rapid closing speed. Ease off, leave space and pass only when legal and safe."],
  [98,"question-99-Question_99.png","How does this roadside caution sign differ from the orange triangle mounted on a vehicle?","It prohibits slow-moving vehicles","It warns that slow vehicles may be ahead; the triangle identifies a particular slow vehicle","It sets a minimum speed","It creates a slow-vehicle-only lane","B","The roadside sign warns about the possibility of slow vehicles, while the reflective triangle is displayed on the rear of the slow-moving vehicle itself."],
  [99,"question-100-Question_100.png","What should you prepare to do after this pedestrian-crossover-ahead sign?","Sound the horn before the crossing","Pass any slowing vehicle","Slow down and be ready to yield or stop for pedestrians","Move into the opposing lane","C","The advance sign warns of a pedestrian crossover. Approach at a speed that lets you yield or stop safely."],
  [100,"question-100-Question_100.png","Does this advance sign mark the exact stopping point for the crossover?","Yes, drivers must stop beside it","Yes, but only at night","No, because pedestrians must yield there","No; it warns that the actual crossover is farther ahead","D","The yellow sign provides advance warning. The crossover itself is identified by its signs, lights or pavement markings farther ahead."]
]
$questions$::jsonb) as source(item);

do $$
declare
  source_match_count integer;
begin
  if (select count(*) from new_sign_question_batch) <> 100 then
    raise exception 'Expected 100 authored sign questions';
  end if;

  if (select count(distinct source_image_key) from new_sign_question_batch) <> 50 then
    raise exception 'Expected exactly 50 reused sign images';
  end if;

  if exists (
    select 1 from new_sign_question_batch
    group by source_image_key
    having count(*) <> 2
  ) then
    raise exception 'Every selected sign image must receive exactly two questions';
  end if;

  if (select count(distinct question_text) from new_sign_question_batch) <> 100 then
    raise exception 'Authored sign question text must be unique';
  end if;

  if exists (
    select 1
    from new_sign_question_batch
    where correct_option not in ('A', 'B', 'C', 'D')
      or btrim(question_text) = ''
      or btrim(option_a) = ''
      or btrim(option_b) = ''
      or btrim(option_c) = ''
      or btrim(option_d) = ''
      or btrim(explanation) = ''
      or cardinality(array[
        lower(btrim(option_a)), lower(btrim(option_b)),
        lower(btrim(option_c)), lower(btrim(option_d))
      ]) <> cardinality(array(
        select distinct value
        from unnest(array[
          lower(btrim(option_a)), lower(btrim(option_b)),
          lower(btrim(option_c)), lower(btrim(option_d))
        ]) as value
      ))
  ) then
    raise exception 'Authored sign question structure is invalid';
  end if;

  if exists (
    select 1
    from new_sign_question_batch as authored
    join public.signs_questions as existing
      on lower(btrim(existing.question_text)) = lower(btrim(authored.question_text))
  ) then
    raise exception 'Authored sign question duplicates existing question text';
  end if;

  if exists (
    select correct_option
    from new_sign_question_batch
    group by correct_option
    having count(*) <> 25
  ) or (select count(distinct correct_option) from new_sign_question_batch) <> 4 then
    raise exception 'Correct answers must be balanced 25 each across A-D';
  end if;

  select count(*)
  into source_match_count
  from new_sign_question_batch as authored
  join public.signs_questions as source_sign
    on split_part(source_sign.image_url, '/', -1) = authored.source_image_key
   and source_sign.id <= 100
   and coalesce(source_sign.is_active, true);

  if source_match_count <> 100 then
    raise exception 'Expected 100 unique original source-sign matches, found %', source_match_count;
  end if;
end
$$;

insert into public.signs_questions (
  question_text,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_option,
  image_url,
  explanation,
  image_description,
  difficulty_level,
  is_frequently_tested,
  is_active,
  category,
  subcategory,
  learning_topic,
  handbook_section,
  handbook_url
)
select
  authored.question_text,
  authored.option_a,
  authored.option_b,
  authored.option_c,
  authored.option_d,
  authored.correct_option,
  source_sign.image_url,
  authored.explanation,
  source_sign.image_description,
  case
    when authored.authoring_id in (1,5,7,9,13,15,19,21,23,25,27,29,33,41,43,45,49,55,57,61) then 'easy'
    when authored.authoring_id in (2,6,8,12,16,18,22,24,28,30,32,34,36,40,44,46,48,52,54,58,64,72,80,90,96) then 'hard'
    else 'medium'
  end,
  authored.authoring_id <= 60,
  true,
  source_sign.category,
  source_sign.subcategory,
  source_sign.learning_topic,
  case
    when authored.source_image_key in (
      'question-48-Question_48.png',
      'question-49-Question_49.png',
      'question-50-question_50.png'
    ) then 'Driving along'
    when authored.source_image_key = 'question-13-Question_13.png' then 'Stopping'
    else 'Signs'
  end,
  case
    when authored.source_image_key in (
      'question-48-Question_48.png',
      'question-49-Question_49.png',
      'question-50-question_50.png'
    ) then 'https://www.ontario.ca/document/official-mto-drivers-handbook/driving-along'
    when authored.source_image_key = 'question-13-Question_13.png'
      then 'https://www.ontario.ca/document/official-mto-drivers-handbook/stopping'
    else 'https://www.ontario.ca/document/official-mto-drivers-handbook/signs'
  end
from new_sign_question_batch as authored
join public.signs_questions as source_sign
  on split_part(source_sign.image_url, '/', -1) = authored.source_image_key
 and source_sign.id <= 100
 and coalesce(source_sign.is_active, true)
order by authored.authoring_id;

do $$
begin
  if (
    select count(*)
    from public.signs_questions as sign_question
    join new_sign_question_batch as authored
      on sign_question.question_text = authored.question_text
    where coalesce(sign_question.is_active, true)
  ) <> 100 then
    raise exception 'Post-insert validation did not find all 100 new active sign questions';
  end if;
end
$$;

commit;
