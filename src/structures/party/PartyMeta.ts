import Meta from '../../util/Meta';
import type { Island, PartySchema, PartyZoneInstanceIdMeta } from '../../../resources/structs';

/**
 * Represents a party's meta
 */
class PartyMeta extends Meta<PartySchema> {
  /**
   * The currently selected island
   */
  public get island(): Island | undefined {
    return this.get('Default:SelectedIsland_j')?.SelectedIsland;
  }

  /**
   * The region ID (EU, NAE, NAW, etc.)
   */
  public get regionId(): string | undefined {
    const regionId = this.get('Default:RegionId_s');
    if (typeof regionId !== 'string' || regionId.length === 0) {
      return undefined;
    }

    return regionId;
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
   * The STW theater ID: a hex ID identifying a theater from the World Info structure
   */
  public get theaterId(): string {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this as any).get('Default:TheaterId_s');
  }

  /**
   * The STW zone tile index: a number identifying a location on the theater map
   */
  public get zoneTileIndex(): number | undefined {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this as any).get('Default:ZoneTileIndex_U');
  }

  /**
   * The party's matchmaking state
   */
  public get matchmakingState(): string {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this as any).get('Default:MatchmakingState_s');
  }
}

export default PartyMeta;
