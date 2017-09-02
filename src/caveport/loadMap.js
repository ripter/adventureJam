import Container from './container.js';
import Room from './room.js';

const MAPS = {
   index: require('./maps/index.js'),
};

export default function loadMap(name) {
  const map = MAPS[name];
  let containers = {};

  //create containers and load the starting rooms
  //0,0 is currently the starting point regardless of the map

  //ground floor
  containers["north-north"] = new Container("north-north","{\"x\":0,\"y\":0,\"z\":-4}",(map["0,2,0"] ? new Room(map["0,2,0"].data) : null),"0,2,0");
  containers["north-west"] = new Container("north-west","{\"x\":-4,\"y\":0,\"z\":0}",(map["-1,1,0"] ? new Room(map["-1,1,0"].data) : null), "-1,1,0");
  containers["north"] = new Container("north","{\"x\":0,\"y\":0,\"z\":0}",(map["0,1,0"] ? new Room(map["0,1,0"].data) : null),"0,1,0");
  containers["north-east"] = new Container("north-east","{\"x\":4,\"y\":0,\"z\":0}",(map["1,1,0"] ? new Room(map["1,1,0"].data) : null),"1,1,0");
  containers["west-west"] = new Container("west-west","{\"x\":-8,\"y\":0,\"z\":4}",(map["-2,0,0"] ? new Room(map["-2,0,0"].data) : null),"-2,0,0");
  containers["west"] = new Container("west","{\"x\":-4,\"y\":0,\"z\":4}",(map["-1,0,0"] ? new Room(map["-1,0,0"].data) : null),"-1,0,0");
  containers["center"] = new Container("center","{\"x\":0,\"y\":0,\"z\":4}",(map["0,0,0"] ? new Room(map["0,0,0"].data) : null),"0,0,0");
  containers["east"] = new Container("east","{\"x\":4,\"y\":0,\"z\":4}",(map["1,0,0"] ? new Room(map["1,0,0"].data) : null),"1,0,0");
  containers["east-east"] = new Container("east-east","{\"x\":8,\"y\":0,\"z\":4}",(map["2,0,0"] ? new Room(map["2,0,0"].data) : null),"2,0,0");
  containers["south-west"] = new Container("south-west","{\"x\":-4,\"y\":0,\"z\":8}",(map["-1,-1,0"] ? new Room(map["-1,-1,0"].data) : null),"-1,-1,0");
  containers["south"] = new Container("south","{\"x\":0,\"y\":0,\"z\":8}",(map["0,-1,0"] ? new Room(map["0,-1,0"].data) : null),"0,-1,0");
  containers["south-east"] = new Container("south-east","{\"x\":4,\"y\":0,\"z\":8}",(map["1,-1,0"] ? new Room(map["1,-1,0"].data) : null),"1,-1,0");
  containers["south-south"] = new Container("south-south","{\"x\":0,\"y\":0,\"z\":12}",(map["0,-2,0"] ? new Room(map["0,-2,0"].data) : null),"0,-2,0");

  //bottom floor
  containers["bottom-north-north"] = new Container("bottom-north-north","{\"x\":0,\"y\":-4,\"z\":-4}",(map["0,2,-1"] ? new Room(map["0,2,-1"].data) : null),"0,2,-1");
  containers["bottom-north-west"] = new Container("bottom-north-west","{\"x\":-4,\"y\":-4,\"z\":0}",(map["-1,1,-1"] ? new Room(map["-1,1,-1"].data) : null), "-1,1,-1");
  containers["bottom-north"] = new Container("bottom-north","{\"x\":0,\"y\":-4,\"z\":0}",(map["0,1,-1"] ? new Room(map["0,1,-1"].data) : null),"0,1,-1");
  containers["bottom-north-east"] = new Container("bottom-north-east","{\"x\":4,\"y\":-4,\"z\":0}",(map["1,1,-1"] ? new Room(map["1,1,-1"].data) : null),"1,1,-1");
  containers["bottom-west-west"] = new Container("bottom-west-west","{\"x\":-8,\"y\":-4,\"z\":4}",(map["-2,0,-1"] ? new Room(map["-2,0,-1"].data) : null),"-2,0,-1");
  containers["bottom-west"] = new Container("bottom-west","{\"x\":-4,\"y\":-4,\"z\":4}",(map["-1,0,-1"] ? new Room(map["-1,0,-1"].data) : null),"-1,0,-1");
  containers["bottom-center"] = new Container("bottom-center","{\"x\":0,\"y\":-4,\"z\":4}",(map["0,0,-1"] ? new Room(map["0,0,-1"].data) : null),"0,0,-1");
  containers["bottom-east"] = new Container("bottom-east","{\"x\":4,\"y\":-4,\"z\":4}",(map["1,0,-1"] ? new Room(map["1,0,-1"].data) : null),"1,0,-1");
  containers["bottom-east-east"] = new Container("bottom-east-east","{\"x\":8,\"y\":-4,\"z\":4}",(map["2,0,-1"] ? new Room(map["2,0,-1"].data) : null),"2,0,-1");
  containers["bottom-south-west"] = new Container("bottom-south-west","{\"x\":-4,\"y\":-4,\"z\":8}",(map["-1,-1,-1"] ? new Room(map["-1,-1,-1"].data) : null),"-1,-1,-1");
  containers["bottom-south"] = new Container("bottom-south","{\"x\":0,\"y\":-4,\"z\":8}",(map["0,-1,-1"] ? new Room(map["0,-1,-1"].data) : null),"0,-1,-1");
  containers["bottom-south-east"] = new Container("bottom-south-east","{\"x\":4,\"y\":-4,\"z\":8}",(map["1,-1,-1"] ? new Room(map["1,-1,-1"].data) : null),"1,-1,-1");
  containers["bottom-south-south"] = new Container("bottom-south-south","{\"x\":0,\"y\":-4,\"z\":12}",(map["0,-2,-1"] ? new Room(map["0,-2,-1"].data) : null),"0,-2,-1");

  //top floor
  containers["top-north-north"] = new Container("top-north-north","{\"x\":0,\"y\":4,\"z\":-4}",(map["0,2,1"] ? new Room(map["0,2,1"].data) : null),"0,2,1");
  containers["top-north-west"] = new Container("top-north-west","{\"x\":-4,\"y\":4,\"z\":0}",(map["-1,1,1"] ? new Room(map["-1,1,1"].data) : null), "-1,1,1");
  containers["top-north"] = new Container("top-north","{\"x\":0,\"y\":4,\"z\":0}",(map["0,1,1"] ? new Room(map["0,1,1"].data) : null),"0,1,1");
  containers["top-north-east"] = new Container("top-north-east","{\"x\":4,\"y\":4,\"z\":0}",(map["1,1,1"] ? new Room(map["1,1,1"].data) : null),"1,1,1");
  containers["top-west-west"] = new Container("top-west-west","{\"x\":-8,\"y\":4,\"z\":4}",(map["-2,0,1"] ? new Room(map["-2,0,1"].data) : null),"-2,0,1");
  containers["top-west"] = new Container("top-west","{\"x\":-4,\"y\":4,\"z\":4}",(map["-1,0,1"] ? new Room(map["-1,0,1"].data) : null),"-1,0,1");
  containers["top-center"] = new Container("top-center","{\"x\":0,\"y\":4,\"z\":4}",(map["0,0,1"] ? new Room(map["0,0,1"].data) : null),"0,0,1");
  containers["top-east"] = new Container("top-east","{\"x\":4,\"y\":4,\"z\":4}",(map["1,0,1"] ? new Room(map["1,0,1"].data) : null),"1,0,1");
  containers["top-east-east"] = new Container("top-east-east","{\"x\":8,\"y\":4,\"z\":4}",(map["2,0,1"] ? new Room(map["2,0,1"].data) : null),"2,0,1");
  containers["top-south-west"] = new Container("top-south-west","{\"x\":-4,\"y\":4,\"z\":8}",(map["-1,-1,1"] ? new Room(map["-1,-1,1"].data) : null),"-1,-1,1");
  containers["top-south"] = new Container("top-south","{\"x\":0,\"y\":4,\"z\":8}",(map["0,-1,1"] ? new Room(map["0,-1,1"].data) : null),"0,-1,1");
  containers["top-south-east"] = new Container("top-south-east","{\"x\":4,\"y\":4,\"z\":8}",(map["1,-1,1"] ? new Room(map["1,-1,1"].data) : null),"1,-1,1");
  containers["top-south-south"] = new Container("top-south-south","{\"x\":0,\"y\":4,\"z\":12}",(map["0,-2,1"] ? new Room(map["0,-2,1"].data) : null),"0,-2,1");

  //render the room data for the containers
  for (var key in containers) {
    //add items for visible rooms if they exist
    if(map[containers[key].room_id] && map[containers[key].room_id].item) {
      containers[key].addItem(map[containers[key].room_id].item);
    }
    containers[key].render();
  }

  return containers;
}
