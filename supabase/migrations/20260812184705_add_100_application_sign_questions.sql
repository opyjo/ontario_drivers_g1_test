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
  [1,"question-1-Question_1.png","You see this advance-warning sign while approaching an intersection. What should you prepare to do?","Come to a complete stop at the stop sign ahead","Speed up before the intersection","Yield only if another driver flashes their lights","Turn around before reaching the intersection","A","The sign warns that a stop sign is ahead. Slow down and prepare to make a complete stop at the upcoming stop sign."],
  [2,"question-1-Question_1.png","How does this sign differ from an actual stop sign?","It applies only to trucks","It gives advance warning; the required stop is farther ahead","It requires stopping beside the warning sign","It marks the end of a stop-controlled area","B","This yellow diamond sign is advance warning. The red stop symbol shows that the actual stop sign is ahead."],
  [3,"question-2-Question_2.png","What is the safest response when you encounter this winding-road sign?","Move onto the shoulder","Cross the centreline to straighten the curves","Reduce speed and steer smoothly through the curves","Accelerate before every bend","C","A winding-road sign warns of several curves ahead. Enter at a safe speed and use smooth steering."],
  [4,"question-2-Question_2.png","Which driving behaviour is least appropriate after this warning sign?","Looking well ahead through each curve","Maintaining a safe following distance","Keeping within your lane","Attempting an unnecessary pass through the winding section","D","Limited sight distance and changing road direction make unnecessary passing especially risky on a winding road."],
  [5,"question-3-Question_3.png","What must you do while this regulatory sign applies?","Remain behind other vehicles and do not pass","Pass only on the shoulder","Pass if your vehicle is faster","Use the opposing lane whenever it is empty","A","The red slash over the vehicles means passing is prohibited on this section of road."],
  [6,"question-3-Question_3.png","When may you consider passing after seeing this sign?","Immediately after sounding your horn","Only after the restriction ends and passing is otherwise legal and safe","Whenever the vehicle ahead travels below the limit","Only while travelling uphill","B","Wait until the no-passing restriction has ended, then pass only where markings, signs, sight distance and traffic make it legal and safe."],
  [7,"question-4-Question_4.png","This sign shows that a divided roadway begins. Which path should you take?","Drive to the left of the median","Drive over the painted gore area","Keep to the roadway on the right of the divider","Choose either side regardless of traffic direction","C","When a divided roadway begins, keep to the right-hand roadway so the median separates opposing traffic."],
  [8,"question-4-Question_4.png","What change in road layout should you expect beyond this sign?","The right lane becomes a parking lane","All traffic must turn at the divider","The roadway becomes one-way with no median","Opposing traffic will be separated by a median or divider","D","This warning sign shows the beginning of a divided highway, where opposing traffic travels on separated roadways."],
  [9,"question-5-Question_5.png","What should you do as you approach the intersection shown by this warning sign?","Scan in every direction and be ready for crossing traffic","Assume your road always has the right-of-way","Stop beside the warning sign in every case","Move into the opposing lane for visibility","A","The sign warns of an intersection ahead. Check for traffic, signs, signals and road users as you approach."],
  [10,"question-5-Question_5.png","Does this intersection-ahead sign itself require a complete stop?","Yes, even if no stop sign or signal is present","No; obey the controls and right-of-way rules at the intersection","Only during daylight hours","Only when travelling straight through","B","This is a warning sign, not a stop control. Follow any signs or signals and apply the normal right-of-way rules at the intersection."],
  [11,"question-6-Question_6.png","How should you respond when the pavement narrows ahead?","Drive partly on the shoulder","Accelerate before the narrow section","Adjust speed and position while allowing safe clearance","Stop in your lane until no vehicles are visible","C","The available roadway width is reduced ahead. Slow if necessary and maintain safe clearance from other road users."],
  [12,"question-6-Question_6.png","Which manoeuvre should you avoid near the narrowed pavement?","Checking mirrors before adjusting position","Leaving extra room beside cyclists","Watching for changes at the road edge","Passing side by side where the reduced width leaves little clearance","D","Reduced pavement width can leave too little lateral clearance for safe side-by-side passing."],
  [13,"question-7-Question_7.png","Your route would normally require reversing direction here. What should you do?","Continue until you can use a legal alternative route","Make the U-turn if no police officer is present","Reverse through the intersection","Drive over the curb to turn around","A","The sign prohibits U-turns. Continue and find another legal, safe way to change direction."],
  [14,"question-7-Question_7.png","Which movement is specifically prohibited by this sign?","A legal left turn onto another road","Turning around to travel in the opposite direction","Continuing straight through the intersection","A legal right turn onto another road","B","The symbol and red slash prohibit a U-turn, which reverses your direction of travel."],
  [15,"question-8-Question_8.png","What driving adjustment is appropriate on entering the signed school zone?","Maintain speed because children must yield","Use the shoulder to pass slower traffic","Slow down, use extra caution and watch for children","Sound the horn continuously","C","The five-sided fluorescent sign marks a school zone. Slow down and watch carefully for children."],
  [16,"question-8-Question_8.png","Which hazard should receive special attention after this sign?","Loose gravel from construction vehicles","A low bridge clearance","Trucks entering from a side road","Children who may be near or crossing the roadway","D","School zones require extra caution because children may be walking, cycling or crossing nearby."],
  [17,"question-9-Question_9.png","Rain begins after you pass this slippery-pavement sign. What should you do?","Reduce speed and make steering and braking inputs smoothly","Follow more closely so others cannot merge","Brake sharply to test traction","Drive on the centreline for better grip","A","Wet pavement may provide less traction. Reduce speed, increase space and steer and brake smoothly."],
  [18,"question-9-Question_9.png","Which action is most likely to cause a skid in the condition shown?","Increasing your following distance","Sudden braking or abrupt steering","Reducing speed before a curve","Keeping both hands on the steering wheel","B","Abrupt braking, acceleration or steering can overwhelm the limited traction on slippery pavement."],
  [19,"question-10-Question_10.png","What should you anticipate after seeing this traffic-signals-ahead sign?","An uncontrolled railway crossing","A permanent road closure","A signal that may require you to slow or stop","A mandatory right turn","C","The warning sign indicates traffic signals ahead. Watch their indication and be prepared to stop."],
  [20,"question-10-Question_10.png","What determines whether you proceed through the intersection ahead?","The colour shown in the warning-sign illustration","The speed of the vehicle behind you","Whether another driver honks","The actual traffic signal and conditions at the intersection","D","The warning sign alerts you to the signal. Your action is governed by the actual signal display and whether the intersection is clear."],
  [21,"question-11-Question_11.png","May you stop briefly to wait for a passenger between these signs?","No; stopping is prohibited in the signed area","Yes, for up to five minutes","Yes, if the engine remains running","Yes, outside rush hour","A","A no-stopping sign prohibits stopping, even briefly, except when required by traffic, an emergency or lawful direction."],
  [22,"question-11-Question_11.png","How is this restriction stronger than a no-parking restriction?","It permits loading freight","It also prohibits brief stops to pick up or drop off passengers","It applies only to commercial vehicles","It allows waiting when the driver stays seated","B","No stopping is stricter than no parking or no standing; you may not stop in the signed area except when legally required."],
  [23,"question-12-Question_12.png","Your planned route turns left at this intersection. What should you do?","Turn left from the right lane","Make a U-turn instead","Continue by a permitted movement and choose another route","Stop until the sign is removed","C","The sign prohibits a left turn. Continue using a movement that is permitted, then find a legal alternative route."],
  [24,"question-12-Question_12.png","When does this no-left-turn sign cease to control your route?","As soon as the intersection is busy","When you signal for at least three seconds","When the vehicle ahead turns left","After you pass the controlled intersection and reach a place where turning is permitted","D","The prohibition applies at the signed intersection. Any later turn must still comply with the signs, signals and road rules there."],
  [25,"question-13-Question_13.png","What is the first required action at this sign?","Bring the vehicle to a complete stop","Slow to walking speed without stopping","Yield only to vehicles on the right","Sound the horn before entering","A","A stop sign requires a complete stop before proceeding when the way is clear."],
  [26,"question-13-Question_13.png","Where should you stop when there is a marked stop line?","Past the pedestrian crossing","Before the stop line","In the middle of the intersection","Beside the stop sign regardless of the line","B","Stop at the marked stop line. If there is no line, use the crosswalk or roadway-edge rules described in the handbook."],
  [27,"question-14-Question_14.png","How should you approach this yield sign?","Always stop for exactly three seconds","Accelerate to merge ahead of traffic","Slow down, give right-of-way and stop if necessary","Continue without checking if travelling straight","C","At a yield sign, slow down or stop if necessary and give the right-of-way before proceeding."],
  [28,"question-14-Question_14.png","When may you proceed past this yield sign?","Whenever you arrive before another vehicle","Only after a police officer waves you through","Without slowing if your lane appears open","When the way is clear after yielding to traffic and pedestrians","D","Proceed only after you have yielded and can enter safely without interfering with other road users."],
  [29,"question-15-Question_15.png","You are travelling more slowly than surrounding traffic on a multilane road. What should you do?","Move to or remain in the right lane when safe","Stay in the left lane to control traffic speed","Drive on the shoulder","Alternate between lanes","A","The sign directs slower traffic to keep right, leaving the left lane available for passing."],
  [30,"question-15-Question_15.png","Why does following this sign improve traffic flow?","It creates a lane for parked vehicles","It allows faster traffic to pass on the left","It permits passing on the shoulder","It removes the need to signal lane changes","B","Keeping slower traffic right reduces lane conflicts and allows other traffic to pass in the proper lane."],
  [31,"question-16-Question_16.png","When may you enter the centre lane marked by this sign?","To pass a slow vehicle","To travel continuously between intersections","To prepare for and complete a left turn","To merge onto a freeway","C","A two-way left-turn lane is shared by traffic from both directions and is used to prepare for left turns."],
  [32,"question-16-Question_16.png","Which use of the signed centre lane is prohibited?","Waiting briefly for a safe gap before a left turn","Entering shortly before a left turn","Watching for vehicles using it from the opposite direction","Using it as a passing or continuous travel lane","D","The centre lane is for left turns from both directions, not for passing or ordinary through travel."],
  [33,"question-17-Question_17.png","The signal is red and this sign is posted. What must you do if you want to turn right?","Wait until the signal permits the turn","Stop, then turn if no vehicle is visible","Turn without stopping if pedestrians are absent","Use the left lane to make the turn","A","The sign prohibits right turns on a red light. Wait for a signal indication that permits the movement."],
  [34,"question-17-Question_17.png","What effect does this sign have on Ontario's usual right-on-red rule?","It permits a rolling turn","It overrides the general permission to turn right after stopping","It applies only to buses","It requires a right turn on green","B","A posted no-right-turn-on-red sign is an exception to the general rule that may otherwise permit the turn after a complete stop."],
  [35,"question-18-Question_18.png","What should you watch for after this truck-entrance warning sign?","Trucks entering only from the left","A mandatory truck inspection station","Large vehicles entering from the right","A truck-only lane ending","C","The symbol shows trucks may enter the roadway from the right. Reduce speed and be ready to share the road."],
  [36,"question-18-Question_18.png","Why should you leave extra room near the entrance shown?","Trucks always have right-of-way","Passenger vehicles must stop at every truck entrance","The roadway becomes one-way","Large trucks may turn slowly and need more space","D","Large vehicles may swing wide, accelerate slowly and occupy more roadway while entering."],
  [37,"question-19-Question_19.png","What is the safest initial response to this deer-crossing sign?","Reduce speed and scan both sides of the road","Sound the horn continuously","Drive close to the centreline","Turn on hazard lights and stop","A","Deer may enter unexpectedly. Reduce speed, watch the roadside and be ready to stop safely."],
  [38,"question-19-Question_19.png","A deer appears ahead after this sign. Which response is best?","Swerve sharply into the opposing lane","Brake in a controlled way while maintaining vehicle control","Accelerate to pass before it crosses","Aim for the shoulder without checking","B","Controlled braking and maintaining your lane are generally safer than a sudden swerve that could cause a more serious collision."],
  [39,"question-20-Question_20.png","How should you drive after this orange road-work sign?","Maintain speed unless a lane is physically blocked","Pass construction vehicles on either side","Reduce speed and obey workers, signs and temporary controls","Stop immediately beside the sign","C","Orange signs warn of temporary conditions. Slow down, stay alert and follow all construction-zone directions."],
  [40,"question-20-Question_20.png","What unusual conditions should you be ready for in the signed area?","A permanent increase in the speed limit","A school crossing at every intersection","Free parking on the shoulder","Workers, equipment, lane changes or uneven surfaces","D","Work zones can contain workers, machinery, altered lanes, temporary controls and changing road surfaces."],
  [41,"question-21-Question_21.png","You face this do-not-enter sign at a roadway entrance. What should you do?","Do not enter that roadway","Enter only if no traffic is approaching","Use the entrance to make a U-turn","Proceed after sounding your horn","A","The sign prohibits entry, commonly because traffic uses the roadway in the opposite direction."],
  [42,"question-21-Question_21.png","What is the safe route-planning response to this sign?","Wait for another driver to enter first","Choose another legal entrance or route","Drive around the sign on the shoulder","Reverse into the prohibited roadway","B","Do not enter. Continue to a legal route rather than attempting to bypass the restriction."],
  [43,"question-22-Question_22.png","Who may park in the space controlled by this sign?","Any driver stopping for less than five minutes","A driver picking up groceries","A vehicle displaying a valid Accessible Parking Permit","Any vehicle with hazard lights on","C","The space is reserved for a vehicle displaying a valid Accessible Parking Permit."],
  [44,"question-22-Question_22.png","May a driver without the required permit use this space while remaining in the vehicle?","Yes, if the engine stays running","Yes, while waiting for a passenger","Yes, outside business hours","No, the permit requirement still applies","D","Remaining in the vehicle does not remove the requirement for a valid Accessible Parking Permit."],
  [45,"question-23-Question_23.png","Which movement is prohibited at the signed intersection?","Continuing straight through","Turning right","Turning left","Stopping before the intersection","A","The red slash over the straight arrow means you must not drive straight through the intersection."],
  [46,"question-23-Question_23.png","What may you do instead of proceeding straight?","Choose any turn without checking","Make a permitted turn only if other signs, signals and traffic allow it","Reverse through the intersection","Drive onto the sidewalk","B","A turn may be used only if it is otherwise permitted and can be completed safely."],
  [47,"question-24-Question_24.png","You approach a vehicle displaying this orange triangle. What should you expect?","A vehicle travelling above the speed limit","A vehicle carrying dangerous goods","A vehicle that normally travels at 40 km/h or less","An emergency vehicle responding to a call","C","The slow-moving vehicle sign identifies vehicles that normally travel at 40 km/h or less."],
  [48,"question-24-Question_24.png","Where is this emblem normally displayed?","On the front of every commercial truck","On either side of a school bus","Above a temporary detour sign","On the rear of a slow-moving vehicle","D","The orange triangle with a red border is displayed on the rear of a slow-moving vehicle."],
  [49,"question-26-Question_26.png","How must you pass the traffic island shown by this regulatory sign?","Keep to the right of the island","Keep to the left of the island","Stop beside the island","Drive over either side of the island","A","The arrow directs traffic to keep right of the traffic island or obstruction."],
  [50,"question-26-Question_26.png","Which path conflicts with this sign?","Passing the island at a controlled speed","Driving to the left of the island","Checking for pedestrians near the island","Remaining within the marked lane","B","The sign requires vehicles to pass on the right, so travelling to the left of the island is prohibited."],
  [51,"question-27-Question_27.png","What should you consider when approaching this narrow-bridge sign?","The bridge is closed to all traffic","The road becomes divided","Available width and clearance from oncoming traffic","The bridge has a lift span","C","A narrow bridge may leave less lateral clearance. Slow as needed and watch oncoming traffic."],
  [52,"question-27-Question_27.png","Which manoeuvre is least suitable near the narrow bridge?","Reducing speed before entering","Keeping within your lane","Allowing extra space beside cyclists","Attempting to pass another vehicle on the bridge","D","Passing on a narrow bridge can leave inadequate clearance and should be avoided."],
  [53,"question-28-Question_28.png","Before using the lane marked by this diamond sign, what should you verify?","That your vehicle, occupancy and travel time meet the posted conditions","That you are travelling faster than all other traffic","That the regular lanes are congested","That your trip is longer than 10 kilometres","A","Diamond lanes are reserved for the vehicles or occupancy levels shown, often only during posted times."],
  [54,"question-28-Question_28.png","What does the diamond symbol communicate about this lane?","It is always the fastest lane","The lane has special eligibility conditions","It is reserved for emergency stopping","It is a passing lane for all vehicles","B","The diamond marks a reserved lane. The accompanying symbols and times state who may use it and when."],
  [55,"question-29-Question_29.png","What must a cyclist do at a road entrance displaying this sign?","Ride on the sidewalk instead","Continue if no motor vehicle is present","Do not enter the prohibited road","Dismount only during rush hour","C","The bicycle symbol with a red slash means bicycles are not allowed on that road."],
  [56,"question-29-Question_29.png","How should a cyclist respond when planning a route past this restriction?","Ignore it when traffic is light","Ride against traffic to remain visible","Use the road only at night","Choose a legal alternative route","D","The restriction prohibits bicycles, so cyclists must use another lawful route."],
  [57,"question-30-Question_30.png","When the posted days and times apply, what parking does this sign permit?","Parking for no more than 30 minutes","Unlimited parking","Passenger loading only","Parking only for permit holders","A","The green permissive sign allows parking for up to 30 minutes during the posted days and times."],
  [58,"question-30-Question_30.png","What should you do before leaving your vehicle in this space?","Assume the permission applies all day","Check the time limit, arrow and posted schedule","Park partly on the shoulder","Cover the licence plate","B","Parking permissions can be limited by time, direction and schedule. Read every part of the sign."],
  [59,"question-31-Question_31.png","What does the green circle around the snowmobile indicate?","Snowmobiles are prohibited","A snowmobile crossing is ahead","Snowmobiles may use this road","Only snowmobiles may use the road","C","A green circle is permissive. This sign indicates snowmobiles may use the road."],
  [60,"question-31-Question_31.png","What should a motor-vehicle driver anticipate on a road with this sign?","All other traffic is prohibited","Snowmobiles always have priority","The road ends at a snowmobile trail","Snowmobiles may be sharing or entering the roadway","D","Because snowmobiles are permitted, drivers should watch for them and leave safe space."],
  [61,"question-32-Question_32.png","What route does this green bicycle symbol identify?","A designated bicycle route","A road where bicycles are prohibited","A bicycle crossing warning","A bicycle repair station","A","The green circle is permissive and the bicycle symbol marks a designated bicycle route."],
  [62,"question-32-Question_32.png","How can you distinguish this sign from a no-bicycles sign?","It is yellow and diamond-shaped","It uses a green circle rather than a red slash","It always includes a speed limit","It is mounted only on traffic signals","B","Green circles show permitted activities, while a red circle and slash show a prohibition."],
  [63,"question-33-Question_33.png","Before descending the signed 8% grade, what should you do?","Shift to neutral","Accelerate to build momentum","Select an appropriate lower gear and control speed","Turn off the engine","C","A steep hill may require a lower gear so the engine helps control speed and reduces reliance on the brakes."],
  [64,"question-33-Question_33.png","Why should you increase following distance on this steep descent?","The speed limit no longer applies","Vehicles behind always have priority","The road becomes one-way","Stopping distances may increase and brakes can overheat","D","Grades can lengthen stopping distance, and prolonged braking can reduce brake effectiveness."],
  [65,"question-34-Question_34.png","What should a driver do near the bicycle crossing shown?","Watch for cyclists and yield when required","Drive in the bicycle lane for visibility","Stop even when no cyclist is present","Sound the horn at every cyclist","A","The warning sign indicates cyclists may cross the roadway. Reduce speed and be ready to yield or stop."],
  [66,"question-34-Question_34.png","How does this yellow sign differ from a no-bicycles sign?","It creates a bicycle-only lane","It warns of a crossing instead of prohibiting bicycles","It requires cyclists to stop","It permits motor vehicles on a trail","B","The yellow diamond is a warning that bicycles may cross; it does not prohibit bicycle travel."],
  [67,"question-35-Question_35.png","How should you prepare for the paved surface ending?","Move into the opposing lane","Increase speed before the transition","Slow down and maintain firm, smooth control","Stop and wait for another vehicle","C","The change to an unpaved surface can reduce traction and vehicle stability, so reduce speed before the transition."],
  [68,"question-35-Question_35.png","Which action should you avoid at the pavement transition?","Increasing following distance","Holding the steering wheel securely","Watching for loose material","Abrupt steering or hard braking","D","Sudden control inputs can cause a loss of traction on loose or uneven surfaces."],
  [69,"question-36-Question_36.png","Traffic will merge ahead. What should you do on the through road?","Adjust speed and spacing to cooperate while keeping control of your lane","Stop to let every merging vehicle enter","Move onto the shoulder","Accelerate to block the merge","A","Watch the merging traffic and create space when practical without making an unsafe move."],
  [70,"question-36-Question_36.png","What is expected of a driver entering from the merging roadway?","The through traffic must always stop","Find a safe gap and merge without forcing other traffic to brake sharply","Enter at any speed because the lane has priority","Use hazard lights instead of signalling","B","Merging drivers must adjust speed, signal and enter a safe gap without disrupting traffic."],
  [71,"question-37-Question_37.png","What hazard does the HIDDEN panel emphasize at this sideroad?","A hidden railway crossing","A concealed pedestrian tunnel","Drivers on the sideroad may have a restricted view","A lane reserved for emergency vehicles","C","The sign warns that drivers at the sideroad may not have a clear view of approaching traffic."],
  [72,"question-37-Question_37.png","How should you respond as you approach the hidden sideroad?","Assume sideroad traffic will see you","Move left without checking","Increase speed to clear the area","Slow as needed and be ready for a vehicle to enter unexpectedly","D","Restricted sight lines can prevent other drivers from seeing you, so approach cautiously and be prepared to react."],
  [73,"question-38-Question_38.png","Your route takes the branch shown on this sign. What should you do before the split?","Check mirrors, signal and position early for the branch","Stop in the through lane to read the sign","Cross the solid centreline","Wait until the last moment to change position","A","Advance warning lets you check traffic, signal and move into the correct position before the road branches."],
  [74,"question-38-Question_38.png","Which detail distinguishes this road-branch sign from a merge warning?","Two through lanes narrow into one lane","A route branches away instead of traffic joining the roadway","Opposing traffic becomes separated by a median","A railway track crosses the roadway at an angle","B","The symbol shows a branch leaving the main road; a merge sign instead warns that traffic streams join."],
  [75,"question-39-Question_39.png","A passing or climbing lane begins ahead and you are travelling slowly. Where should you drive?","On the shoulder","In the left lane","In the right lane, unless passing","Across the lane line","C","When the extra lane begins, slower traffic should keep right so other vehicles can pass on the left."],
  [76,"question-39-Question_39.png","What is the main purpose of the additional lane shown?","Parking heavy vehicles","Creating a bicycle-only route","Allowing U-turns on hills","Allowing vehicles to pass slower traffic safely","D","Passing or climbing lanes give faster traffic a safer opportunity to pass slower vehicles."],
  [77,"question-40-Question_40.png","What must a motor-vehicle driver avoid where this bicycle-lane sign applies?","Driving or parking in the bicycle-only lane unless a lawful manoeuvre requires crossing it","Passing a cyclist in another lane","Checking the right blind spot","Yielding before a turn","A","The lane is reserved for bicycles. Motor vehicles must not use it as a travel or parking lane."],
  [78,"question-40-Question_40.png","Before turning across the marked bicycle lane, what should you do?","Stop in the bicycle lane and wait","Check for cyclists and yield before crossing their path","Sound the horn and turn immediately","Accelerate ahead of any cyclist","B","Check mirrors and blind spot, signal, and yield to cyclists before crossing a bicycle lane to turn."],
  [79,"question-41-Question_41.png","What brief stop is permitted in this no-standing area?","Waiting for a friend who has not arrived","Loading freight while the driver leaves the vehicle","Actively picking up or dropping off passengers","Parking while making a phone call","C","No standing allows a brief stop only to pick up or drop off passengers, unless another restriction applies."],
  [80,"question-41-Question_41.png","Which action violates this sign?","Stopping because traffic is blocked","Stopping for a police officer","Letting a passenger out promptly","Waiting at the curb for a passenger to arrive","D","Waiting is standing and is prohibited. The passenger must be ready for immediate pickup or drop-off."],
  [81,"question-42-Question_42.png","Which vehicle may use the exception shown beneath the no-standing symbol?","A vehicle displaying the required Accessible Parking Permit","Any taxi carrying a passenger","Any vehicle with hazard lights on","A delivery vehicle","A","The permit panel creates an exception for a vehicle displaying the required Accessible Parking Permit."],
  [82,"question-42-Question_42.png","What must an eligible driver do to rely on this signed exception?","Remain in the driver's seat","Display a valid Accessible Parking Permit","Arrive outside rush hour","Obtain permission from a nearby business","B","The signed exception applies only when the vehicle displays the valid permit identified on the sign."],
  [83,"question-43-Question_43.png","What must a pedestrian do when this sign controls a route?","Walk on the roadway facing traffic","Proceed if no vehicle is nearby","Use another permitted pedestrian route","Cross only at night","C","The pedestrian symbol with a red slash prohibits pedestrians from using that route or area."],
  [84,"question-43-Question_43.png","How should a driver interpret this no-pedestrians sign?","Pedestrians can never be nearby","The shoulder becomes a passing lane","Drivers no longer need to scan the roadside","Pedestrian access is prohibited, but drivers must still remain alert","D","The sign restricts pedestrian access; it does not remove the driver's duty to watch for unexpected road users."],
  [85,"question-44-Question_44.png","A school bus is preparing to enter from the signed loading zone. What should you do?","Slow down and be prepared to yield to the bus","Pass the bus on the shoulder","Stop beside the warning sign","Accelerate before the bus enters","A","The sign marks a school-bus loading zone. Approach cautiously and be prepared for a bus to enter the roadway."],
  [86,"question-44-Question_44.png","What traffic movement should you particularly anticipate after this sign?","A train crossing the road","A school bus entering or leaving the roadway","A mandatory school-zone U-turn","A bicycle lane ending","B","The warning sign indicates a school-bus loading area and possible bus movements ahead."],
  [87,"question-45-Question_45.png","Water is flowing over the road after this warning sign. What is the safest response?","Maintain speed to avoid stalling","Drive through without checking if another vehicle crossed","Slow down, assess the hazard and avoid entering if depth or safety is uncertain","Move into the opposing lane","C","Water can conceal road damage and may be deeper or faster than it appears. Do not enter when safe passage is uncertain."],
  [88,"question-45-Question_45.png","Why is water across the road dangerous?","It always freezes immediately","It guarantees the road is closed","It improves tire traction","It can hide damage and cause loss of control or vehicle movement","D","Standing or flowing water can reduce traction, hide washouts and move a vehicle from its path."],
  [89,"question-46-Question_46.png","How should you drive through an area marked by this falling-rock sign?","Reduce speed and watch for rocks on or falling toward the road","Stop directly below the rock face","Drive close behind a large truck","Use the shoulder to avoid the traffic lane","A","The sign warns of fallen or falling rock. Scan ahead, reduce speed and be prepared to avoid debris safely."],
  [90,"question-46-Question_46.png","Where should you avoid waiting unnecessarily in this signed area?","On a level section beyond the hazard","Directly beside or beneath the unstable rock face","At a designated parking area","Behind a protective barrier","B","Do not stop unnecessarily where falling material could strike the vehicle."],
  [91,"question-47-Question_47.png","What change should you expect beyond this two-way-traffic sign?","Both lanes will travel in your direction","The road becomes a freeway","Oncoming traffic will share the roadway","Traffic must keep left","C","The opposing arrows warn that traffic will move in both directions on the same roadway."],
  [92,"question-47-Question_47.png","Which lane position is appropriate after this sign?","Straddle the centreline for visibility","Use whichever lane is empty","Drive on the shoulder","Keep to the right of the centreline unless lawfully passing","D","On a two-way road, remain on the right side and respect centreline markings and passing rules."],
  [93,"question-51-Question_51.png","What should you do before reaching the bump or uneven pavement shown?","Reduce speed while maintaining control","Accelerate so the suspension clears it quickly","Move into the opposing lane","Apply the parking brake","A","Slow down before the uneven area and keep firm control of the vehicle."],
  [94,"question-51-Question_51.png","When should most braking be completed for the bump ahead?","While the wheels are on top of the bump","Before reaching the uneven surface","After crossing into the opposing lane","Only after the rear wheels have passed","B","Reducing speed before the bump avoids abrupt braking while the tires and suspension are unsettled."],
  [95,"question-53-Question_53.png","What should you do as you approach the railway crossing announced by this sign?","Assume trains must stop for road traffic","Pass any slower vehicle before the tracks","Look and listen for trains and be prepared to stop","Stop only if another driver stops","C","The sign gives advance warning of railway tracks. Slow down, scan and be prepared to stop for a train or crossing control."],
  [96,"question-53-Question_53.png","How does this sign relate to the railway crossing itself?","It replaces every crossing signal","It means the tracks are abandoned","It gives road traffic priority over trains","It is advance warning; obey the controls at the tracks","D","This yellow sign warns that tracks are ahead. At the crossing, obey gates, lights, bells, signs and any approaching train."],
  [97,"question-55-Question_55.png","You are in the right lane when you see that it ends ahead. What should you do?","Check mirrors and blind spot, signal and merge left when safe","Stop at the end of the lane","Accelerate onto the shoulder","Cross the centreline","A","Plan the merge early, signal and enter the continuing lane only when there is a safe gap."],
  [98,"question-55-Question_55.png","Which behaviour is unsafe as the right lane ends?","Matching the speed of a suitable gap","Racing to the lane end and forcing into traffic","Checking the left blind spot","Cooperating with merging traffic","B","Waiting until the last moment and forcing a merge can cause sudden braking and sideswipe collisions."],
  [99,"question-57-Question_57.png","The divided highway ends beyond this sign. Where should you position your vehicle?","To the left of the median","Across the centreline","On the right side of the two-way roadway","On the shoulder","C","When the divided section ends, opposing traffic shares one roadway. Keep right of the centreline."],
  [100,"question-57-Question_57.png","What new hazard appears after the divided roadway ends?","A mandatory toll booth","A bicycle-only lane","A bridge lift span","Oncoming vehicles are no longer separated by a median","D","With the median gone, opposing traffic travels on the same roadway, increasing the importance of lane position and centreline markings."]
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
    select 1
    from new_sign_question_batch
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
   and coalesce(source_sign.is_active, true);

  if source_match_count <> 100 then
    raise exception 'Expected 100 unique active source-sign matches, found %', source_match_count;
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
  'Signs',
  'https://www.ontario.ca/document/official-mto-drivers-handbook/signs'
from new_sign_question_batch as authored
join public.signs_questions as source_sign
  on split_part(source_sign.image_url, '/', -1) = authored.source_image_key
 and coalesce(source_sign.is_active, true)
order by authored.authoring_id;

create or replace function public.get_random_g1_questions(
  question_limit integer default 40,
  rules_limit integer default 20,
  signs_limit integer default 20,
  difficulty_filter character varying default null::character varying,
  exclude_recent_ids jsonb default '{}'::jsonb
)
returns table(
  id integer,
  question_text text,
  question_type character varying,
  option_a text,
  option_b text,
  option_c text,
  option_d text,
  correct_option text,
  image_url text,
  image_description text,
  category text,
  explanation text
)
language plpgsql
set search_path to 'public'
as $function$
begin
  return query
  with rules as (
    select
      r.id + 10000,
      r.question_text,
      'rules'::character varying(10),
      r.option_a,
      r.option_b,
      r.option_c,
      r.option_d,
      r.correct_option::text,
      null::text,
      null::text,
      r.category::text,
      r.explanation
    from public.rules_questions as r
    where coalesce(r.is_active, true)
      and (difficulty_filter is null or r.difficulty_level = difficulty_filter)
      and (
        exclude_recent_ids is null
        or exclude_recent_ids = '{}'::jsonb
        or not (exclude_recent_ids ? (r.id + 10000)::text)
      )
    order by random()
    limit least(greatest(coalesce(rules_limit, 20), 0), 50)
  ),
  sign_candidates as (
    select
      s.id,
      s.question_text,
      s.option_a,
      s.option_b,
      s.option_c,
      s.option_d,
      s.correct_option,
      s.image_url,
      s.image_description,
      s.category,
      s.explanation,
      row_number() over (
        partition by coalesce(nullif(s.image_url, ''), 'sign-id:' || s.id::text)
        order by random()
      ) as image_rank
    from public.signs_questions as s
    where coalesce(s.is_active, true)
      and (difficulty_filter is null or s.difficulty_level = difficulty_filter)
      and (
        exclude_recent_ids is null
        or exclude_recent_ids = '{}'::jsonb
        or not (exclude_recent_ids ? s.id::text)
      )
  ),
  signs as (
    select
      candidate.id,
      candidate.question_text,
      'signs'::character varying(10),
      candidate.option_a,
      candidate.option_b,
      candidate.option_c,
      candidate.option_d,
      candidate.correct_option::text,
      candidate.image_url,
      candidate.image_description,
      coalesce(candidate.category, 'General Signs')::text,
      candidate.explanation
    from sign_candidates as candidate
    where candidate.image_rank = 1
    order by random()
    limit least(greatest(coalesce(signs_limit, 20), 0), 50)
  )
  select *
  from (
    select * from rules
    union all
    select * from signs
  ) as combined
  order by random()
  limit least(greatest(coalesce(question_limit, 40), 1), 100);
end;
$function$;

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
