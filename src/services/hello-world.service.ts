import {HelloWorldApi} from './hello-world.api';
import {Inject, Provides, Singleton} from 'typescript-ioc';
import {LoggerApi} from '../logger';

@Singleton
@Provides(HelloWorldApi)
export class HelloWorldService implements HelloWorldApi {
  logger: LoggerApi;

  constructor(
    @Inject
    logger: LoggerApi,
  ) {
    this.logger = logger.child('HelloWorldService');
  }

  async greeting(name: string = 'World'): Promise<string> {
    this.logger.info(`Generating greeting for ${name}`);
    this.logger.debug('This is a debug message from inside my API');
    // Only Trigger error if the name passed in matches ERROR
    if (name === 'ERROR' ) {
        try {
          throw new Error('"Throwing an error');
        } catch (e) {
          this.logger.error(e);
          throw new Error('"Catching and Throwing errors');
        } finally {
          throw new Error('Last chance to trap this Error');
        }
    }
    return `Hello, ${name}!`;
  }
}
