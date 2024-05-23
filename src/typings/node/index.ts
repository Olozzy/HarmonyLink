import type { CloseEvent, ErrorEvent } from "ws";
import type { EventData } from "./playerEvents";

export interface NodeEvents {
    /**
     * Dispatched when the node gives via the WebSocket a message to the client
     * @param data The data that the node sends
     * @returns {void} void
     */
    lavalinkEvent: (data: string) => void;

    /**
     * Dispatched when the WebSocket connection is opened
     * @returns {void} void
     */
    lavalinkWSOpen: () => void;

    /**
     * Dispatched when the WebSocket connection is closed
     * @param {number} code The event code of the WebSocket
     * @param {Buffer} reason The reason of the WebSocket
     * @returns {void} void
     */
    lavalinkWSClose: (code: number, reason: Buffer) => void;

    /**
     * Dispatched when the WebSocket connection has an error
     * @param {Error} event The event of the WebSocket
     * @returns {void} void
     */
    lavalinkWSError: (event: Error) => void;
};

export interface HarmonyLinkRequesterOptions extends RequestInit {
    params?: string | Record<string, string>;
    data?: Record<string, unknown>;
    path: string;
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    //rawReqData?: UpdatePlayerInfo;
};

export interface NodeStats {
    /**
     * The amount of players connected to the node
     */
    players: number;

    /**
     * The amount of players that are playing music
     */
    playingPlayers: number;
    
    /**
     * The uptime of the node
     */
    uptime: number;

    /**
     * The CPU usage of the node
     */
    cpu: {
        /**
         * The amount of CPU cores
         */
        cores: number;

        /**
         * The system load of the CPU
         */
        systemLoad: number;

        /**
         * The load of the Lavalink
         */
        lavalinkLoad: number;
    };

    /**
     * The memory usage of the node
     */
    memory: {
        /**
         * The amount of memory that is reservable
         */
        reservable: number;
        
        /**
         * The amount of memory that is used
         */
        used: number;
        
        /**
         * The amount of free memory
         */
        free: number;

        /**
         * The amount of memory that is allocated
         */
        allocated: number
    };

    /**
     * The frame stats of the node
     * @attention This is by default NOT included in LavaLink however in NodeLink it is
     */
    frameStats: {
        /**
         * The amount of frames sent
         */
        sent: number;

        /**
         * The amount of frames that have a deficit
         */
        deficit: number;

        /**
         * The amount of nulled frames
         */
        nulled: number
    };
};

export enum NodeType {
    LavaLinkV4 = "lavalinkv4",
    NodeLink = "nodelink",
    FrequenC = "frequenc"
};

export interface NodeGroup {
    /**
     * The name of the node group
     */
    name: string;

    /**
     * The URL or IP address of the node to connect to
     */
    host: string;

    /**
     * The password for authenticating with the node.
     *
     * @default "youshallnotpass"
     */
    password?: string;

    /**
     * The port number of the node.
     *
     * @default 2333
     */
    port?: number;

    /**
     * Indicates whether the node uses a secure connection (HTTPS).
     *
     * @default false
     */
    secure?: boolean;

    /**
     * The type of the node
     * 
     * @default NodeType.LavaLinkV4
     */
    type?: NodeType;
};

export interface NodeOption {
    /**
     * The timeout when trying to reconnect to the node
     */
    reconnectAttemptTimeout: NodeJS.Timeout | null;

    /**
     * The amount of times to try to reconnect to the node
     */
    reconnectTries: number;

    /**
     * The amount of current attempts to reconnect to the node
     */
    currentAttempts: number;

    /**
     * The timeout for the reconnect
     */
    reconnectTimeout: number;

    /**
     * The timeout for resuming the connection in seconds
     */
    resumeTimeout: number;
}

export type NodeOptions = NodeGroup & NodeOption;

/**
 * Dispatched when you successfully connect to the Lavalink node
 */
export interface LavalinkReadyPacket {
   op: "ready";
   resumed: boolean;
   sessionId: string;
};

/**
* Dispatched every x seconds with the latest player state
*/
export interface LavalinkPlayerUpdatePacket {
   op: "playerUpdate";
   guildId: string;
   state: {
       time: number;
       position: number;
       connected: true;
       ping: number;
   };
};

/**
* Dispatched when the node sends stats once per minute
*/
export interface LavalinkNodeStatsPacket extends NodeStats {
   op: "stats";
};

/**
* Dispatched when player or voice events occur
*/
export type LavalinkEventPacket = { op: "event"; guildId: string; } & EventData;

export type LavalinkPackets = LavalinkReadyPacket | LavalinkPlayerUpdatePacket | LavalinkNodeStatsPacket | LavalinkEventPacket
