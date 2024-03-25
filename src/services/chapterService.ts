import Repo from "../db/repository/chapterRepository";
import { chapterDTO } from "../dto";
import HELPERS from "../utils/helpers";

class ChapterService {
  private logInfo = "";
  public async fetchChapters(book: string): Promise<chapterDTO[]> {
    try {
      const chapters = await Repo.getChapters(book);
      this.logInfo = `${
        HELPERS.loggerInfo.success
      } fetching chapters for book: ${book} @ ${HELPERS.currentTime()}`;
      return chapters;
    } catch (error) {
      this.logInfo = `${
        HELPERS.loggerInfo.error
      } fetching chapters for book: ${book} @ ${HELPERS.currentTime()}`;
      throw new Error(error);
    } finally {
      await HELPERS.logger(this.logInfo);
      this.logInfo = "";
    }
  }

  public async fetchChapter(chapterId: string): Promise<chapterDTO> {
    try {
      const chapter = await Repo.getChapter(chapterId);
      this.logInfo = `${
        HELPERS.loggerInfo.success
      } fetching chapter: ${chapterId} @ ${HELPERS.currentTime()}`;
      return chapter;
    } catch (error) {
      this.logInfo = `${
        HELPERS.loggerInfo.error
      } fetching chapter: ${chapterId} @ ${HELPERS.currentTime()}`;
      throw new Error(error);
    } finally {
      await HELPERS.logger(this.logInfo);
      this.logInfo = "";
    }
  }
}

export default new ChapterService();