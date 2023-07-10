import { Body, Controller, Post } from '@nestjs/common';
import { RatingService } from './rating.service';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}
  @Post()
  addRating(@Body() body) {
    return body;
  }
}
