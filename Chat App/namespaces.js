import Namespace from "./classes/namespace.js"
import Room from "./classes/room.js"

let namespaces = [];
let wikiNs = new Namespace(0,'Wiki','/wiki');
let mozNs = new Namespace(1,'Mozilla','/mozilla');
let linuxNs = new Namespace(2,'Linux','/linux');

namespaces.push(wikiNs,mozNs,linuxNs);

wikiNs.addRoom(new Room(0,'New Articles','Wiki'));
wikiNs.addRoom(new Room(1,'Editors','Wiki'));
wikiNs.addRoom(new Room(2,'Other','Wiki'));

mozNs.addRoom(new Room(0,'Firefox','Mozilla'));
mozNs.addRoom(new Room(1,'SeaMonkey','Mozilla'));
mozNs.addRoom(new Room(2,'SpiderMonkey','Mozilla'));
mozNs.addRoom(new Room(3,'Rust','Mozilla'));

linuxNs.addRoom(new Room(0,'Debian','Linux'));
linuxNs.addRoom(new Room(1,'Red Hat','Linux'));
linuxNs.addRoom(new Room(2,'MacOs','Linux'));
linuxNs.addRoom(new Room(3,'Kernal Development','Linux'));

export default namespaces