import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PodcastsService } from './podcasts.service';
import { Podcast } from './entities/podcast.entity';
import {
  CreatePodcastInput,
  CreatePodcastOutput,
} from './dtos/create-podcast.dto';
import { CoreOutput } from './dtos/output.dto';
import {
  PodcastSearchInput,
  PodcastOutput,
  EpisodesOutput,
  EpisodesSearchInput,
  GetAllPodcastsOutput,
} from './dtos/podcast.dto';
import { UpdatePodcastInput } from './dtos/update-podcast.dto';
import { Episode } from './entities/episode.entity';
import {
  CreateEpisodeInput,
  CreateEpisodeOutput,
} from './dtos/create-episode.dto';
import { UpdateEpisodeInput } from './dtos/update-episode.dto';
import { Roles } from 'src/auth/role.decorator';

@Resolver((of) => Podcast)
export class PodcastsResolver {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Roles('Any')
  @Query((returns) => GetAllPodcastsOutput)
  getAllPodcasts(): Promise<GetAllPodcastsOutput> {
    return this.podcastsService.getAllPodcasts();
  }

  @Roles('Host')
  @Mutation((returns) => CreatePodcastOutput)
  createPodcast(
    @Args('input') createPodcastInput: CreatePodcastInput
  ): Promise<CreatePodcastOutput> {
    return this.podcastsService.createPodcast(createPodcastInput);
  }

  @Roles('Any')
  @Query((returns) => PodcastOutput)
  getPodcast(
    @Args('input') podcastSearchInput: PodcastSearchInput
  ): Promise<PodcastOutput> {
    return this.podcastsService.getPodcast(podcastSearchInput.id);
  }

  @Roles('Host')
  @Mutation((returns) => CoreOutput)
  deletePodcast(
    @Args('input') podcastSearchInput: PodcastSearchInput
  ): Promise<CoreOutput> {
    return this.podcastsService.deletePodcast(podcastSearchInput.id);
  }

  @Roles('Host')
  @Mutation((returns) => CoreOutput)
  updatePodcast(
    @Args('input') updatePodcastInput: UpdatePodcastInput
  ): Promise<CoreOutput> {
    return this.podcastsService.updatePodcast(updatePodcastInput);
  }
}

@Resolver((of) => Episode)
export class EpisodeResolver {
  constructor(private readonly podcastService: PodcastsService) {}

  @Roles('Any')
  @Query((returns) => EpisodesOutput)
  getEpisodes(
    @Args('input') podcastSearchInput: PodcastSearchInput
  ): Promise<EpisodesOutput> {
    return this.podcastService.getEpisodes(podcastSearchInput.id);
  }

  @Roles('Host')
  @Mutation((returns) => CreateEpisodeOutput)
  createEpisode(
    @Args('input') createEpisodeInput: CreateEpisodeInput
  ): Promise<CreateEpisodeOutput> {
    return this.podcastService.createEpisode(createEpisodeInput);
  }

  @Roles('Host')
  @Mutation((returns) => CoreOutput)
  updateEpisode(
    @Args('input') updateEpisodeInput: UpdateEpisodeInput
  ): Promise<CoreOutput> {
    return this.podcastService.updateEpisode(updateEpisodeInput);
  }

  @Roles('Host')
  @Mutation((returns) => CoreOutput)
  deleteEpisode(
    @Args('input') episodesSearchInput: EpisodesSearchInput
  ): Promise<CoreOutput> {
    return this.podcastService.deleteEpisode(episodesSearchInput);
  }
}
