import Meta from '../../util/Meta';
import type { PartySchema, PartyZoneInstanceIdMeta, Playlist } from '../../../resources/structs';
import type PartyMemberMeta from './PartyMemberMeta';

/**
 * Represents a party's meta
 */
class PartyMeta extends Meta<PartySchema> {
  /**
   * The currently selected playlist
   */
  public get playlist(): Playlist | undefined {
    return this.get('Default:PlaylistData_j')?.PlaylistData;
  }

  /**
   * The custom matchmaking key
   */
  public get customMatchmakingKey(): string | undefined {
    const key = this.get('Default:CustomMatchKey_s');

    if (typeof key !== 'string' || key.length === 0) return undefined;
    return key;
  }

  /**
   * The squad fill status
   */
  public get squadFill() {
    return !!this.get('Default:AthenaSquadFill_b');
  }

  /**
   * The party's sub-game
   */
  public get subGame(): string {
    return this.get('Default:SubGame_s');
  }

  /**
   * The party state
   */
  public get partyState(): string {
    return this.get('Default:PartyState_s');
  }

  /**
   * The STW zone instance ID, an object whose properties identify
   * the mission the party is getting ready to play
   */
  public get zoneInstanceId() {
    const val = this.get('Default:ZoneInstanceId_s');
    if (typeof val === 'string' && val) {
      return JSON.parse(val) as PartyZoneInstanceIdMeta;
    }
    return undefined;
  }

  /**
   * The STW mission ID: a GUID identifying a mission from the World Info structure
   */
  public get theaterMissionId(): string | undefined {
    return this.zoneInstanceId?.theaterMissionId;
  }

  /**
   * The STW mission alert ID: a GUID identifying a mission alert from the World Info structure
   */
  public get theaterMissionAlertId(): string | undefined {
    return this.zoneInstanceId?.theaterMissionAlertId;
  }

  /**
   * The STW zone theme: an asset path identifying a zone theme (biome) in the game files
   */
  public get zoneThemeClass(): string | undefined {
    return this.zoneInstanceId?.zoneThemeClass;
  }

  /**
   * The STW theater ID: a hex ID identifying a theater from the World Info structure.
   * WARNING: As of Fortnite version 20.10, this may not always be updated for some theaters.
   * The party's {@link PartyMeta#zoneInstanceId} or the party leader's
   * {@link PartyMemberMeta#campaignInfo} may need to be used instead to determine which theater
   * the party is preparing to enter.
   */
  public get theaterId(): string {
    return this.get('Default:TheaterId_s');
  }

  /**
   * The STW zone tile index: a number identifying a location on the theater map.
   * WARNING: As of Fortnite version 20.10, this may not always be updated when the party
   * leader first opens a theater.
   */
  public get zoneTileIndex(): number | undefined {
    return this.get('Default:ZoneTileIndex_U');
  }

  /**
   * The party's matchmaking state
   */
  public get matchmakingState(): string {
    return this.get('Default:MatchmakingState_s');
  }
}

export default PartyMeta;
