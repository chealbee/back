import { Body, Controller, Post } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RolesAuth } from 'src/auth/roles-auth.decorator';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  addRating(@Body() body) {
    return body;
  }
}
