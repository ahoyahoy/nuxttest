// import  { ApiService} from '@mj/api-demo/api/gen/ts/demo/v1/api_pb'

// const {callRpc} = useRpc();
//   let response = await callRpc(ApiService.method.createCharacter,{})
//   console.log(response.)


// /*


// /**
//  * @generated from message demo.v1.Character
//  */
// export type Character = Message<"demo.v1.Character"> & {
//     /**
//      * @generated from field: string id = 1;
//      */
//     id: string;
  
//     /**
//      * @generated from field: string name = 2;
//      */
//     name: string;
  
//     /**
//      *  int32 level = 3 [
//      *    (buf.validate.field).int32.gte = 1,
//      *    (buf.validate.field).int32.lte = 20
//      *  ];
//      *
//      * @generated from field: int32 strength = 4;
//      */
//     strength: number;
  
//     /**
//      * @generated from field: int32 dexterity = 5;
//      */
//     dexterity: number;
  
//     /**
//      * @generated from field: int32 intelligence = 6;
//      */
//     intelligence: number;
  
//     /**
//      * @generated from field: int32 charisma = 7;
//      */
//     charisma: number;
  
//     /**
//      * @generated from field: string class_id = 8;
//      */
//     classId: string;
  
//     /**
//      * @generated from field: string race_id = 9;
//      */
//     raceId: string;
  
//     /**
//      * @generated from field: string player_id = 10;
//      */
//     playerId: string;
//   };