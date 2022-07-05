//SERVER SIDE FUNCTIONS

import Orb from "./public/sockets/classes/orb.js"

//could do binary search for optimization too
export const CheckOrbCollision = (pData,pConfig, orbs, settings) => {
    return new Promise((resolve, reject)=>{
        orbs.forEach((orb,i) => {

          //box check
          if(pData.locX + pData.radius + orb.radius > orb.locX 
            && pData.locX < orb.locX + pData.radius + orb.radius
            && pData.locY + pData.radius + orb.radius > orb.locY 
            && pData.locY < orb.locY + pData.radius + orb.radius) {
              
              //radius check
              const distance = Math.sqrt((pData.locX - orb.locX)**2 + (pData.locY - orb.locY)**2);
              if (distance < pData.radius + orb.radius) {
                  pData.score += 1;
                  pData.orbsAbsorbed += 1;
                  // pData.color = orb.color;
                  if (pConfig.zoom > 1) {
                      pConfig.zoom -= .001;
                  }
                  pData.radius += 0.25;
                  if (pConfig.speed < -0.005) {
                      pConfig.speed += 0.005;
                  } else if (pConfig.speed > 0.005) {
                      pConfig.speed -= 0.005;
                  }
                  orbs.splice(i, 1, new Orb(settings))
                  resolve(i)
                }
            }
        });
        reject()
    });
}
        
export const CheckPlayerCollisions = (pData,pConfig,players,playerId) => {
    return new Promise((resolve, reject)=>{
        players.forEach((curPlayer,i)=>{
            if(curPlayer.socketId != playerId){
                const pLocx = curPlayer.locX
                const pLocy = curPlayer.locY
                const pR = curPlayer.radius
                if(pData.locX + pData.radius + pR > pLocx
                && pData.locX < pLocx + pData.radius + pR
                && pData.locY + pData.radius + pR > pLocy 
                && pData.locY < pLocy + pData.radius + pR){
                    const distance = Math.sqrt((pData.locX - pLocx)**2 + (pData.locY - pLocy)**2)	
                    if(distance < pData.radius + pR){ 
                        if(pData.radius > pR){
                            let collisionData = UpdateScores(pData,curPlayer);
                            if(pConfig.zoom > 1){
                                pConfig.zoom -= (pR * 0.25) * .001;
                            }
                            players.splice(i, 1);
                            resolve(collisionData);

                        }else if(pData.radius < pR){           
                            let collisionData = UpdateScores(curPlayer,pData);
                            players.forEach((p,i)=>{
                                console.log(players[i].name, i)
                                if (playerId == p.socketId){
                                    players.splice(i, 1);
                                }
                            }); 
                            resolve(collisionData);
                        }
                    }
                }
            }
        })
        reject();
    });
}

const UpdateScores = (killer, killed) => {
    killer.score += (killed.score + 10);
    killer.playersAbsorbed += 1;
    killed.alive = false;
    killer.radius += (killed.radius * 0.25)
    return{
        died: killed,
        killedBy: killer,
    }
}
